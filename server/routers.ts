import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  authenticateEmployee,
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  toggleEmployeeStatus,
} from "./employeeDb";
import { sendContactEmail } from "./email";
import { paymentsRouter } from "./routers/payments";
import { adminPaymentsRouter } from "./routers/admin-payments";
import { securityAssessmentRouter } from "./routers/security-assessment";
import { analyticsRouter } from "./routers/analytics";
import { abTestingRouter } from "./routers/ab-testing";
import { socialRouter } from "./routers/social";
import { messagingRouter } from "./routers/messaging";
import { moderationRouter } from "./routers/moderation";
import { storiesRouter } from "./routers/stories";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Employee authentication and management
  employee: router({
    login: publicProcedure
      .input(z.object({
        username: z.string(),
        password: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        const employee = await authenticateEmployee(input.username, input.password);
        
        if (!employee) {
          throw new Error("Invalid username or password");
        }

        // Store employee session in cookie
        const sessionData = {
          id: employee.id,
          username: employee.username,
          name: employee.name,
          role: employee.role,
        };

        // Set cookie with employee session
        ctx.res.cookie('employee_session', JSON.stringify(sessionData), {
          httpOnly: true,
          secure: false, // Allow in development/sandbox
          sameSite: 'lax',
          path: '/',
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return {
          success: true,
          employee: {
            id: employee.id,
            username: employee.username,
            name: employee.name,
            email: employee.email,
            department: employee.department,
            role: employee.role,
          },
        };
      }),

    logout: publicProcedure.mutation(({ ctx }) => {
      ctx.res.clearCookie('employee_session');
      return { success: true };
    }),

    me: publicProcedure.query(({ ctx }) => {
      const cookie = ctx.req.cookies?.employee_session;
      if (!cookie) return null;
      
      try {
        return JSON.parse(cookie);
      } catch {
        return null;
      }
    }),

    // Admin-only procedures
    list: publicProcedure.query(async () => {
      const employees = await getAllEmployees();
      return employees.map(e => ({
        id: e.id,
        username: e.username,
        name: e.name,
        email: e.email,
        department: e.department,
        role: e.role,
        isActive: e.isActive,
        createdAt: e.createdAt,
        lastLogin: e.lastLogin,
      }));
    }),

    create: publicProcedure
      .input(z.object({
        username: z.string(),
        password: z.string(),
        name: z.string(),
        email: z.string().email(),
        department: z.string().optional(),
        role: z.enum(["admin", "employee", "hr"]),
      }))
      .mutation(async ({ input }) => {
        await createEmployee(input);
        return { success: true };
      }),

    update: publicProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        email: z.string().email().optional(),
        department: z.string().optional(),
        role: z.enum(["admin", "employee", "hr"]).optional(),
        password: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await updateEmployee(id, data);
        return { success: true };
      }),

    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteEmployee(input.id);
        return { success: true };
      }),

    toggleStatus: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await toggleEmployeeStatus(input.id);
        return { success: true };
      }),

    // Employee requests
    submitRequest: publicProcedure
      .input(z.object({
        type: z.enum(["vacation", "duty", "report"]),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        reason: z.string(),
        details: z.string(),
        assignmentType: z.string().optional(),
        location: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const employee = ctx.req.cookies.employee_session ? JSON.parse(ctx.req.cookies.employee_session) : null;
        if (!employee) {
          throw new Error("Not authenticated");
        }

        const { getDb } = await import("./db");
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        const { employeeRequests } = await import("../drizzle/schema");

        await db.insert(employeeRequests).values({
          employeeId: employee.id,
          employeeName: employee.name,
          department: employee.department || "General",
          requestType: input.type === "vacation" ? "vacation" : input.type === "duty" ? "duty_assignment" : "report",
          title: input.reason,
          description: input.details + (input.assignmentType ? `\nAssignment Type: ${input.assignmentType}` : "") + (input.location ? `\nLocation: ${input.location}` : ""),
          startDate: input.startDate ? new Date(input.startDate) : null,
          endDate: input.endDate ? new Date(input.endDate) : null,
          status: "pending",
        });

        return { success: true };
      }),

    getMyRequests: publicProcedure
      .query(async ({ ctx }) => {
        const employee = ctx.req.cookies.employee_session ? JSON.parse(ctx.req.cookies.employee_session) : null;
        if (!employee) {
          return [];
        }

        const { getDb } = await import("./db");
        const db = await getDb();
        if (!db) return [];
        const { employeeRequests } = await import("../drizzle/schema");
        const { eq, desc } = await import("drizzle-orm");

        const requests = await db.select().from(employeeRequests)
          .where(eq(employeeRequests.employeeId, employee.id))
          .orderBy(desc(employeeRequests.createdAt));

        return requests;
      }),
  }),

  // Employee Requests Management (HR)
  employeeRequests: router({ 
    getAll: publicProcedure
      .query(async () => {
        const { getDb } = await import("./db");
        const db = await getDb();
        if (!db) return [];
        const { employeeRequests } = await import("../drizzle/schema");
        const { desc } = await import("drizzle-orm");

        const requests = await db.select().from(employeeRequests)
          .orderBy(desc(employeeRequests.createdAt));

        return requests;
      }),

    approve: publicProcedure
      .input(z.object({
        requestId: z.number(),
        hrNotes: z.string().optional(),
        reviewedBy: z.number(),
        reviewedByName: z.string(),
      }))
      .mutation(async ({ input }) => {
        const { getDb } = await import("./db");
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        const { employeeRequests } = await import("../drizzle/schema");
        const { eq } = await import("drizzle-orm");

        // Get request details before updating
        const [request] = await db.select().from(employeeRequests)
          .where(eq(employeeRequests.id, input.requestId));

        if (!request) throw new Error("Request not found");

        // Get employee email
        const { employees } = await import("../drizzle/schema");
        const [employee] = await db.select().from(employees)
          .where(eq(employees.id, request.employeeId));

        await db.update(employeeRequests)
          .set({
            status: "approved",
            hrNotes: input.hrNotes || null,
            reviewedBy: input.reviewedBy,
            reviewedByName: input.reviewedByName,
            reviewedAt: new Date(),
          })
          .where(eq(employeeRequests.id, input.requestId));

        // Send notification email to employee
        if (employee?.email) {
          const { notifyRequestApproval } = await import("./notifications");
          await notifyRequestApproval({
            employeeEmail: employee.email,
            employeeName: request.employeeName,
            requestType: request.requestType,
            requestDetails: request.description,
            reviewerName: input.reviewedByName,
          });
        }

        return { success: true };
      }),

    reject: publicProcedure
      .input(z.object({
        requestId: z.number(),
        hrNotes: z.string(),
        reviewedBy: z.number(),
        reviewedByName: z.string(),
      }))
      .mutation(async ({ input }) => {
        const { getDb } = await import("./db");
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        const { employeeRequests } = await import("../drizzle/schema");
        const { eq } = await import("drizzle-orm");

        // Get request details before updating
        const [request] = await db.select().from(employeeRequests)
          .where(eq(employeeRequests.id, input.requestId));

        if (!request) throw new Error("Request not found");

        // Get employee email
        const { employees } = await import("../drizzle/schema");
        const [employee] = await db.select().from(employees)
          .where(eq(employees.id, request.employeeId));

        await db.update(employeeRequests)
          .set({
            status: "rejected",
            hrNotes: input.hrNotes,
            reviewedBy: input.reviewedBy,
            reviewedByName: input.reviewedByName,
            reviewedAt: new Date(),
          })
          .where(eq(employeeRequests.id, input.requestId));

        // Send notification email to employee
        if (employee?.email) {
          const { notifyRequestRejection } = await import("./notifications");
          await notifyRequestRejection({
            employeeEmail: employee.email,
            employeeName: request.employeeName,
            requestType: request.requestType,
            requestDetails: request.description,
            reviewerName: input.reviewedByName,
            reason: input.hrNotes,
          });
        }

        return { success: true };
      }),
  }),

  // Contact form
  contact: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Valid email is required"),
        company: z.string().optional(),
        phone: z.string().optional(),
        subject: z.string().min(1, "Subject is required"),
        message: z.string().min(10, "Message must be at least 10 characters"),
      }))
      .mutation(async ({ input }) => {
        const result = await sendContactEmail(input);
        
        if (!result.success) {
          throw new Error(result.error || "Failed to send email");
        }
        
        return { success: true };
      }),
  }),

  // Careers and job applications
  careers: router({
    submitApplication: publicProcedure
      .input(z.object({
        jobTitle: z.string().min(1),
        department: z.string().min(1),
        fullName: z.string().min(1),
        email: z.string().email(),
        phone: z.string().min(1),
        linkedIn: z.string().optional(),
        yearsOfExperience: z.number().int().min(0),
        resumeFile: z.string(), // base64 encoded PDF
        resumeFileName: z.string(),
        coverLetter: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { submitJobApplication } = await import("./careersDb");
        const result = await submitJobApplication(input);
        
        if (!result.success) {
          throw new Error(result.error || "Failed to submit application");
        }
        
        return { success: true, applicationId: result.applicationId };
      }),
    
    getApplications: publicProcedure
      .query(async () => {
        const { getAllApplications } = await import("./careersDb");
        return await getAllApplications();
      }),
    
    updateApplicationStatus: publicProcedure
      .input(z.object({
        applicationId: z.number(),
        status: z.enum(["pending", "reviewing", "interviewed", "accepted", "rejected"]),
      }))
      .mutation(async ({ input }) => {
        const { updateApplicationStatus } = await import("./careersDb");
        const result = await updateApplicationStatus(input.applicationId, input.status);
        
        if (!result.success) {
          throw new Error(result.error || "Failed to update application status");
        }
        
        return { success: true };
      }),
   }),

  // Newsletter subscription management
  newsletter: router({
    subscribe: publicProcedure
      .input(z.object({
        email: z.string().email("Valid email is required"),
        name: z.string().optional(),
        interests: z.array(z.string()).optional(),
      }))
      .mutation(async ({ input }) => {
        const { subscribeToNewsletter } = await import("./newsletterDb");
        const { sendWelcomeEmail } = await import("./newsletterEmail");
        
        const result = await subscribeToNewsletter(input);
        
        if (!result.success) {
          throw new Error(result.error || "Failed to subscribe");
        }
        
        // Send welcome email (don't block on this)
        sendWelcomeEmail(input.email, input.name).catch(err => {
          console.error("Failed to send welcome email:", err);
        });
        
        return { success: true };
      }),
    
    unsubscribe: publicProcedure
      .input(z.object({
        email: z.string().email(),
      }))
      .mutation(async ({ input }) => {
        const { unsubscribeFromNewsletter } = await import("./newsletterDb");
        const result = await unsubscribeFromNewsletter(input.email);
        
        if (!result.success) {
          throw new Error(result.error || "Failed to unsubscribe");
        }
        
        return { success: true };
      }),
    
    getSubscribers: publicProcedure
      .query(async () => {
        const { getAllSubscribers } = await import("./newsletterDb");
        return await getAllSubscribers();
      }),
  }),

  // System monitoring and health checks
  monitoring: router({
    getSystemHealth: publicProcedure
      .query(async () => {
        const { getSystemHealth } = await import("./monitoring");
        return await getSystemHealth();
      }),
    
    getDatabaseHealth: publicProcedure
      .query(async () => {
        const { checkDatabaseHealth } = await import("./monitoring");
        return await checkDatabaseHealth();
      }),
    
    getEmailHealth: publicProcedure
      .query(async () => {
        const { checkEmailHealth } = await import("./monitoring");
        return await checkEmailHealth();
      }),
    
    getServerHealth: publicProcedure
      .query(async () => {
        const { checkServerHealth } = await import("./monitoring");
        return await checkServerHealth();
      }),
  }),

  // Payment and subscription management
  payments: paymentsRouter,
  
  // Admin payment management
  adminPayments: adminPaymentsRouter,
  
  // Security assessment tool
  securityAssessment: securityAssessmentRouter,
  
  // Analytics tracking
  analytics: analyticsRouter,
  
  // A/B testing framework
  abTesting: abTestingRouter,
  
  // Social media platform
  social: socialRouter,
  messaging: messagingRouter,
  moderation: moderationRouter,
  stories: storiesRouter,
});
export type AppRouter = typeof appRouter;
