import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM_EMAIL = "notifications@apex-meridian.com";

export interface EmailNotification {
  to: string;
  subject: string;
  html: string;
}

/**
 * Send email notification using Resend
 */
export async function sendEmail({ to, subject, html }: EmailNotification) {
  if (!resend) {
    console.error("Resend not configured");
    return { success: false, error: "Email service not configured" };
  }
  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    });
    return { success: true, id: result.data?.id };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error: String(error) };
  }
}

/**
 * Send employee request approval notification
 */
export async function notifyRequestApproval({
  employeeEmail,
  employeeName,
  requestType,
  requestDetails,
  reviewerName,
}: {
  employeeEmail: string;
  employeeName: string;
  requestType: string;
  requestDetails: string;
  reviewerName: string;
}) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1e3a8a; color: white; padding: 20px; text-align: center; }
          .content { background: #f9fafb; padding: 30px; margin: 20px 0; border-radius: 8px; }
          .status { background: #10b981; color: white; padding: 10px 20px; border-radius: 4px; display: inline-block; font-weight: bold; }
          .details { background: white; padding: 15px; margin: 15px 0; border-left: 4px solid #3b82f6; }
          .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>A p e x - M e r i d i a n ®</h1>
          </div>
          <div class="content">
            <h2>Request Approved ✓</h2>
            <p>Dear ${employeeName},</p>
            <p>Your <strong>${requestType}</strong> request has been approved by ${reviewerName}.</p>
            <div class="details">
              <h3>Request Details:</h3>
              <p>${requestDetails}</p>
            </div>
            <p>If you have any questions, please contact HR at hr@apex-meridian.com</p>
          </div>
          <div class="footer">
            <p>© 2026 A p e x - M e r i d i a n ® LLC. All rights reserved.</p>
            <p>New Cairo, Cairo Governorate, Egypt</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: employeeEmail,
    subject: `Request Approved: ${requestType}`,
    html,
  });
}

/**
 * Send employee request rejection notification
 */
export async function notifyRequestRejection({
  employeeEmail,
  employeeName,
  requestType,
  requestDetails,
  reviewerName,
  reason,
}: {
  employeeEmail: string;
  employeeName: string;
  requestType: string;
  requestDetails: string;
  reviewerName: string;
  reason?: string;
}) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1e3a8a; color: white; padding: 20px; text-align: center; }
          .content { background: #f9fafb; padding: 30px; margin: 20px 0; border-radius: 8px; }
          .status { background: #ef4444; color: white; padding: 10px 20px; border-radius: 4px; display: inline-block; font-weight: bold; }
          .details { background: white; padding: 15px; margin: 15px 0; border-left: 4px solid #ef4444; }
          .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>A p e x - M e r i d i a n ®</h1>
          </div>
          <div class="content">
            <h2>Request Not Approved</h2>
            <p>Dear ${employeeName},</p>
            <p>Your <strong>${requestType}</strong> request has been reviewed by ${reviewerName} and cannot be approved at this time.</p>
            <div class="details">
              <h3>Request Details:</h3>
              <p>${requestDetails}</p>
              ${reason ? `<h3>Reason:</h3><p>${reason}</p>` : ""}
            </div>
            <p>If you have any questions or would like to discuss this decision, please contact HR at hr@apex-meridian.com</p>
          </div>
          <div class="footer">
            <p>© 2026 A p e x - M e r i d i a n ® LLC. All rights reserved.</p>
            <p>New Cairo, Cairo Governorate, Egypt</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: employeeEmail,
    subject: `Request Update: ${requestType}`,
    html,
  });
}

/**
 * Send onboarding milestone notification
 */
export async function notifyOnboardingMilestone({
  employeeEmail,
  employeeName,
  milestone,
  nextSteps,
}: {
  employeeEmail: string;
  employeeName: string;
  milestone: string;
  nextSteps: string;
}) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1e3a8a; color: white; padding: 20px; text-align: center; }
          .content { background: #f9fafb; padding: 30px; margin: 20px 0; border-radius: 8px; }
          .milestone { background: #3b82f6; color: white; padding: 10px 20px; border-radius: 4px; display: inline-block; font-weight: bold; margin: 15px 0; }
          .next-steps { background: white; padding: 15px; margin: 15px 0; border-left: 4px solid #10b981; }
          .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>A p e x - M e r i d i a n ®</h1>
          </div>
          <div class="content">
            <h2>Onboarding Progress Update 🎯</h2>
            <p>Dear ${employeeName},</p>
            <p>Congratulations! You've completed an important milestone in your onboarding journey:</p>
            <div class="milestone">${milestone}</div>
            <div class="next-steps">
              <h3>Next Steps:</h3>
              <p>${nextSteps}</p>
            </div>
            <p>Visit your <a href="https://apex-meridian.com/onboarding">Onboarding Portal</a> to continue your journey.</p>
            <p>If you need any assistance, please contact HR at hr@apex-meridian.com</p>
          </div>
          <div class="footer">
            <p>© 2026 A p e x - M e r i d i a n ® LLC. All rights reserved.</p>
            <p>New Cairo, Cairo Governorate, Egypt</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: employeeEmail,
    subject: `Onboarding Milestone: ${milestone}`,
    html,
  });
}

/**
 * Notify HR about new employee request
 */
export async function notifyHRNewRequest({
  requestType,
  employeeName,
  requestDetails,
  requestId,
}: {
  requestType: string;
  employeeName: string;
  requestDetails: string;
  requestId: number;
}) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1e3a8a; color: white; padding: 20px; text-align: center; }
          .content { background: #f9fafb; padding: 30px; margin: 20px 0; border-radius: 8px; }
          .alert { background: #fbbf24; color: #78350f; padding: 15px; border-radius: 4px; margin: 15px 0; font-weight: bold; }
          .details { background: white; padding: 15px; margin: 15px 0; border-left: 4px solid #3b82f6; }
          .button { background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 15px 0; }
          .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>A p e x - M e r i d i a n ®</h1>
          </div>
          <div class="content">
            <h2>New Employee Request Pending Review</h2>
            <div class="alert">⚠️ Action Required</div>
            <p>A new <strong>${requestType}</strong> request has been submitted by ${employeeName} and requires your review.</p>
            <div class="details">
              <h3>Request Details:</h3>
              <p>${requestDetails}</p>
              <p><strong>Request ID:</strong> #${requestId}</p>
            </div>
            <a href="https://apex-meridian.com/hr-requests" class="button">Review Request</a>
            <p>Please review and respond to this request at your earliest convenience.</p>
          </div>
          <div class="footer">
            <p>© 2026 A p e x - M e r i d i a n ® LLC. All rights reserved.</p>
            <p>New Cairo, Cairo Governorate, Egypt</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: "hr@apex-meridian.com",
    subject: `New ${requestType} Request from ${employeeName}`,
    html,
  });
}
