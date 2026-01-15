import { Resend } from "resend";

// Initialize Resend client
// Note: RESEND_API_KEY should be set in environment variables
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
}

/**
 * Send contact form submission email to info@apex-meridian.com
 */
export async function sendContactEmail(data: ContactFormData): Promise<{ success: boolean; error?: string }> {
  // If Resend is not configured, return error
  if (!resend) {
    console.error("RESEND_API_KEY not configured");
    return {
      success: false,
      error: "Email service not configured. Please contact administrator.",
    };
  }

  try {
    // Send email using Resend
    const result = await resend.emails.send({
      from: "Apex Meridian Contact Form <onboarding@resend.dev>", // Resend verified sender
      to: ["info@apex-meridian.com"],
      replyTo: data.email,
      subject: `Contact Form: ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0891b2;">New Contact Form Submission</h2>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${data.name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${data.email}</p>
            ${data.company ? `<p style="margin: 10px 0;"><strong>Company:</strong> ${data.company}</p>` : ""}
            ${data.phone ? `<p style="margin: 10px 0;"><strong>Phone:</strong> ${data.phone}</p>` : ""}
            <p style="margin: 10px 0;"><strong>Subject:</strong> ${data.subject}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #374151;">Message:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${data.message}</p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          
          <p style="color: #6b7280; font-size: 12px;">
            This email was sent from the Apex Meridian contact form at ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    });

    if (result.error) {
      console.error("Resend API error:", result.error);
      return {
        success: false,
        error: "Failed to send email. Please try again later.",
      };
    }

    console.log("Contact email sent successfully:", result.data?.id);
    return { success: true };
  } catch (error) {
    console.error("Error sending contact email:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}
