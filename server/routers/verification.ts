import { z } from "zod";
import { protectedProcedure, router, adminProcedure } from "../_core/trpc";
import { getDb } from "../db";
import { eq, and, desc, gt } from "drizzle-orm";
import * as schema from "../../drizzle/schema";
import { TRPCError } from "@trpc/server";
import { storagePut } from "../storage";

// Helper function to generate random 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Helper function to generate random suffix for file keys
function randomSuffix(): string {
  return Math.random().toString(36).substring(2, 15);
}

export const verificationRouter = router({
  // ============================================================================
  // PHONE VERIFICATION
  // ============================================================================

  /**
   * Send OTP to phone number
   * Note: In production, integrate with SMS provider (Twilio, AWS SNS, etc.)
   */
  sendPhoneOTP: protectedProcedure
    .input(
      z.object({
        phoneNumber: z.string().min(10).max(20),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      // Generate OTP
      const otpCode = generateOTP();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      // Store OTP in database
      await db.insert(schema.phoneVerificationOTPs).values({
        userId: ctx.user.id,
        phoneNumber: input.phoneNumber,
        otpCode,
        expiresAt,
        verified: 0,
      });

      // TODO: Send SMS via provider
      // For development, return OTP (remove in production!)
      console.log(`[DEV] OTP for ${input.phoneNumber}: ${otpCode}`);

      return {
        success: true,
        message: "OTP sent successfully",
        // Remove this in production:
        devOTP: process.env.NODE_ENV === "development" ? otpCode : undefined,
      };
    }),

  /**
   * Verify phone OTP
   */
  verifyPhoneOTP: protectedProcedure
    .input(
      z.object({
        phoneNumber: z.string().min(10).max(20),
        otpCode: z.string().length(6),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      // Find OTP
      const otpResults = await db
        .select()
        .from(schema.phoneVerificationOTPs)
        .where(
          and(
            eq(schema.phoneVerificationOTPs.userId, ctx.user.id),
            eq(schema.phoneVerificationOTPs.phoneNumber, input.phoneNumber),
            eq(schema.phoneVerificationOTPs.otpCode, input.otpCode),
            eq(schema.phoneVerificationOTPs.verified, 0),
            gt(schema.phoneVerificationOTPs.expiresAt, new Date())
          )
        )
        .limit(1);

      const otp = otpResults[0];

      if (!otp) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid or expired OTP",
        });
      }

      // Mark OTP as verified
      await db
        .update(schema.phoneVerificationOTPs)
        .set({ verified: 1 })
        .where(eq(schema.phoneVerificationOTPs.id, otp.id));

      // Update user profile
      await db
        .update(schema.socialProfiles)
        .set({
          phoneNumber: input.phoneNumber,
          phoneVerified: 1,
          phoneVerifiedAt: new Date(),
        })
        .where(eq(schema.socialProfiles.userId, ctx.user.id));

      return { success: true, message: "Phone verified successfully" };
    }),

  // ============================================================================
  // KYC VERIFICATION
  // ============================================================================

  /**
   * Upload KYC document
   */
  uploadKYCDocument: protectedProcedure
    .input(
      z.object({
        documentType: z.enum(["passport", "national_id", "drivers_license", "selfie"]),
        documentData: z.string(), // base64 encoded image
        documentNumber: z.string().optional(),
        expiryDate: z.string().optional(), // ISO date string
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      // Decode base64 and upload to S3
      const buffer = Buffer.from(input.documentData.split(",")[1] || input.documentData, "base64");
      const fileKey = `kyc/${ctx.user.id}/${input.documentType}-${randomSuffix()}.jpg`;
      
      const { url: documentUrl } = await storagePut(fileKey, buffer, "image/jpeg");

      // Store document record
      await db.insert(schema.kycDocuments).values({
        userId: ctx.user.id,
        documentType: input.documentType,
        documentUrl,
        documentNumber: input.documentNumber,
        expiryDate: input.expiryDate ? new Date(input.expiryDate) : undefined,
      });

      return { success: true, documentUrl };
    }),

  /**
   * Submit KYC for review
   */
  submitKYC: protectedProcedure.mutation(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

    // Check if user has uploaded required documents
    const documents = await db
      .select()
      .from(schema.kycDocuments)
      .where(eq(schema.kycDocuments.userId, ctx.user.id));

    if (documents.length < 2) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Please upload at least 2 documents (ID + selfie)",
      });
    }

    // Update profile KYC status
    await db
      .update(schema.socialProfiles)
      .set({
        kycStatus: "pending",
        kycSubmittedAt: new Date(),
      })
      .where(eq(schema.socialProfiles.userId, ctx.user.id));

    return { success: true, message: "KYC submitted for review" };
  }),

  /**
   * Get KYC status
   */
  getKYCStatus: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

    const profileResults = await db
      .select()
      .from(schema.socialProfiles)
      .where(eq(schema.socialProfiles.userId, ctx.user.id))
      .limit(1);

    const profile = profileResults[0];

    if (!profile) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Profile not found" });
    }

    const documents = await db
      .select()
      .from(schema.kycDocuments)
      .where(eq(schema.kycDocuments.userId, ctx.user.id))
      .orderBy(desc(schema.kycDocuments.uploadedAt));

    return {
      kycStatus: profile.kycStatus,
      kycSubmittedAt: profile.kycSubmittedAt,
      kycReviewedAt: profile.kycReviewedAt,
      kycRejectionReason: profile.kycRejectionReason,
      documents,
    };
  }),

  /**
   * Get pending KYC submissions (admin only)
   */
  getPendingKYC: adminProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(50).default(20),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const profiles = await db
        .select()
        .from(schema.socialProfiles)
        .where(eq(schema.socialProfiles.kycStatus, "pending"))
        .orderBy(desc(schema.socialProfiles.kycSubmittedAt))
        .limit(input.limit)
        .offset(input.offset);

      // Get documents for each profile
      const profilesWithDocs = await Promise.all(
        profiles.map(async (profile) => {
          const documents = await db
            .select()
            .from(schema.kycDocuments)
            .where(eq(schema.kycDocuments.userId, profile.userId))
            .orderBy(desc(schema.kycDocuments.uploadedAt));

          return { ...profile, documents };
        })
      );

      return profilesWithDocs;
    }),

  /**
   * Review KYC submission (admin only)
   */
  reviewKYC: adminProcedure
    .input(
      z.object({
        userId: z.number(),
        approved: z.boolean(),
        rejectionReason: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      await db
        .update(schema.socialProfiles)
        .set({
          kycStatus: input.approved ? "approved" : "rejected",
          kycReviewedAt: new Date(),
          kycReviewedBy: ctx.user.id,
          kycRejectionReason: input.rejectionReason,
          isVerified: input.approved ? 1 : 0,
          verifiedAt: input.approved ? new Date() : undefined,
        })
        .where(eq(schema.socialProfiles.userId, input.userId));

      return { success: true };
    }),
});
