import { getDb } from "./db";
import { jobApplications } from "../drizzle/schema";
import { storagePut } from "./storage";
import { Resend } from "resend";
import { eq } from "drizzle-orm";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

interface JobApplicationInput {
  jobTitle: string;
  department: string;
  fullName: string;
  email: string;
  phone: string;
  linkedIn?: string;
  yearsOfExperience: number;
  resumeFile: string; // base64 encoded PDF
  resumeFileName: string;
  coverLetter?: string;
}

export async function submitJobApplication(input: JobApplicationInput): Promise<{ success: boolean; applicationId?: number; error?: string }> {
  try {
    // Upload resume to S3
    const resumeBuffer = Buffer.from(input.resumeFile.split(',')[1], 'base64');
    const resumeKey = `resumes/${Date.now()}-${input.resumeFileName}`;
    const { url: resumeUrl } = await storagePut(resumeKey, resumeBuffer, 'application/pdf');

    // Save application to database
    const db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }
    
    const [application] = await db.insert(jobApplications).values({
      jobTitle: input.jobTitle,
      department: input.department,
      fullName: input.fullName,
      email: input.email,
      phone: input.phone,
      linkedIn: input.linkedIn,
      yearsOfExperience: input.yearsOfExperience,
      resumeUrl,
      coverLetter: input.coverLetter,
      status: 'pending',
    });

    // Send email notification to HR
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0891b2;">New Job Application Received</h2>
        
        <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #0c4a6e; margin-top: 0;">Position Details</h3>
          <p><strong>Job Title:</strong> ${input.jobTitle}</p>
          <p><strong>Department:</strong> ${input.department}</p>
        </div>

        <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #0c4a6e; margin-top: 0;">Applicant Information</h3>
          <p><strong>Name:</strong> ${input.fullName}</p>
          <p><strong>Email:</strong> ${input.email}</p>
          <p><strong>Phone:</strong> ${input.phone}</p>
          ${input.linkedIn ? `<p><strong>LinkedIn:</strong> <a href="${input.linkedIn}">${input.linkedIn}</a></p>` : ''}
          <p><strong>Years of Experience:</strong> ${input.yearsOfExperience}</p>
        </div>

        ${input.coverLetter ? `
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #0c4a6e; margin-top: 0;">Cover Letter</h3>
          <p style="white-space: pre-wrap;">${input.coverLetter}</p>
        </div>
        ` : ''}

        <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #065f46; margin-top: 0;">Resume</h3>
          <p><a href="${resumeUrl}" style="color: #0891b2; text-decoration: none;">📄 Download Resume (${input.resumeFileName})</a></p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
          <p>This application was submitted through the Apex Meridian careers portal.</p>
          <p>Application ID: ${application.insertId}</p>
          <p>Submitted: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `;

    // Send email notification to HR
    if (resend) {
      try {
        await resend.emails.send({
          from: "Apex Meridian Careers <onboarding@resend.dev>",
          to: ['HR@apex-meridian.com'],
          subject: `New Application: ${input.jobTitle} - ${input.fullName}`,
          html: emailHtml,
        });
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Don't fail the application submission if email fails
      }
    }

    return { success: true, applicationId: application.insertId };
  } catch (error) {
    console.error('Error submitting job application:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function getAllApplications() {
  try {
    const db = await getDb();
    if (!db) {
      return [];
    }
    const applications = await db.select().from(jobApplications).orderBy(jobApplications.createdAt);
    return applications;
  } catch (error) {
    console.error('Error fetching applications:', error);
    return [];
  }
}

export async function updateApplicationStatus(applicationId: number, status: string): Promise<{ success: boolean; error?: string }> {
  try {
    const db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }
    
    await db
      .update(jobApplications)
      .set({ status: status as any })
      .where(eq(jobApplications.id, applicationId));
    
    return { success: true };
  } catch (error) {
    console.error('Error updating application status:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
