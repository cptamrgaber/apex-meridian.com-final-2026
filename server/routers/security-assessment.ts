import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { Resend } from "resend";
import { ENV } from "../_core/env";
import { trackEvent } from "../lib/analytics";
import { updateLeadScore } from "../lib/leadScoring";

const resend = new Resend(process.env.RESEND_API_KEY || "");

export const securityAssessmentRouter = router({
  sendReport: publicProcedure
    .input(z.object({
        name: z.string().min(1),
        email: z.string().email(),
        company: z.string().min(1),
        role: z.string().min(1),
        score: z.number().min(0).max(100),
        categoryScores: z.record(z.string(), z.number()),
        recommendations: z.array(z.string()),
      })
    )
    .mutation(async ({ input }) => {
      const { name, email, company, role, score, categoryScores, recommendations } = input;

      // Determine risk level
      let riskLevel = "Critical Risk";
      let riskColor = "#ef4444";
      if (score >= 80) {
        riskLevel = "Low Risk";
        riskColor = "#10b981";
      } else if (score >= 60) {
        riskLevel = "Moderate Risk";
        riskColor = "#eab308";
      } else if (score >= 40) {
        riskLevel = "High Risk";
        riskColor = "#f97316";
      }

      // Generate HTML email
      const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Security Assessment Report</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%); color: white; padding: 30px 20px; text-center; }
    .header h1 { margin: 0; font-size: 28px; }
    .content { padding: 30px 20px; }
    .score-box { background: #f8fafc; border-left: 4px solid ${riskColor}; padding: 20px; margin: 20px 0; border-radius: 4px; }
    .score-number { font-size: 48px; font-weight: bold; color: ${riskColor}; margin: 0; }
    .risk-level { font-size: 24px; font-weight: bold; color: ${riskColor}; margin: 10px 0; }
    .category { margin: 15px 0; }
    .category-name { font-weight: bold; margin-bottom: 5px; }
    .progress-bar { background: #e2e8f0; height: 20px; border-radius: 10px; overflow: hidden; }
    .progress-fill { background: ${riskColor}; height: 100%; display: flex; align-items: center; justify-content: flex-end; padding-right: 10px; color: white; font-size: 12px; font-weight: bold; }
    .recommendation { background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 15px; margin: 10px 0; border-radius: 4px; }
    .cta-button { display: inline-block; background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
    .footer { background: #1e293b; color: #94a3b8; padding: 20px; text-center; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🛡️ Security Assessment Report</h1>
      <p style="margin: 10px 0 0 0; font-size: 16px;">Personalized Security Posture Analysis</p>
    </div>
    
    <div class="content">
      <p>Dear ${name},</p>
      <p>Thank you for completing the Apex Meridian Security Assessment. Based on your responses, here is your comprehensive security posture analysis:</p>
      
      <div class="score-box">
        <p class="score-number">${score}/100</p>
        <p class="risk-level">${riskLevel}</p>
        <p style="margin: 10px 0 0 0; color: #64748b;">Overall Security Score</p>
      </div>

      <h2 style="color: #1e293b; margin-top: 30px;">Category Breakdown</h2>
      ${Object.entries(categoryScores)
        .map(
          ([category, catScore]) => `
        <div class="category">
          <div class="category-name">${category}</div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${catScore}%;">${catScore}%</div>
          </div>
        </div>
      `
        )
        .join("")}

      <h2 style="color: #1e293b; margin-top: 30px;">Architecture Recommendations</h2>
      ${recommendations
        .map(
          (rec) => `
        <div class="recommendation">
          ✓ ${rec}
        </div>
      `
        )
        .join("")}

      <p style="margin-top: 30px;">Our security team has reviewed your assessment and identified specific areas where we can help strengthen your security posture. We recommend scheduling a consultation to discuss a tailored security architecture for your environment.</p>

      <center>
        <a href="https://apex-meridian.manus.space/contact" class="cta-button">Schedule Security Consultation</a>
      </center>

      <p style="margin-top: 30px; font-size: 14px; color: #64748b;">This assessment is based on your self-reported responses and provides general guidance. A comprehensive security audit by our team will provide more detailed findings and recommendations.</p>
    </div>

    <div class="footer">
      <p style="margin: 0 0 10px 0;"><strong>Apex Meridian</strong></p>
      <p style="margin: 0;">AI-Native Enterprise Security Solutions</p>
      <p style="margin: 10px 0 0 0;">+201 2 00 92 90 92 | apex-meridian.net</p>
    </div>
  </div>
</body>
</html>
      `;

      // Send email
      try {
        await resend.emails.send({
          from: "Apex Meridian Security <security@apex-meridian.net>",
          to: email,
          subject: `Your Security Assessment Report - ${score}/100 (${riskLevel})`,
          html: htmlContent,
        });

        // Also send notification to internal team
        await resend.emails.send({
          from: "Apex Meridian Security <security@apex-meridian.net>",
          to: "security@apex-meridian.net",
          subject: `New Security Assessment Lead: ${company}`,
          html: `
            <h2>New Security Assessment Completed</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Role:</strong> ${role}</p>
            <p><strong>Score:</strong> ${score}/100 (${riskLevel})</p>
            <p><strong>Category Scores:</strong></p>
            <ul>
              ${Object.entries(categoryScores)
                .map(([cat, score]) => `<li>${cat}: ${score}%</li>`)
                .join("")}
            </ul>
            <p><strong>Recommendations:</strong></p>
            <ul>
              ${recommendations.map((rec) => `<li>${rec}</li>`).join("")}
            </ul>
          `,
        });

        // Track assessment completion
        await trackEvent({
          eventType: 'assessment_completion',
          userEmail: email,
          metadata: { score, riskLevel, company, role }
        });

        // Update lead score (+50 points)
        await updateLeadScore(email, 'assessment_completion');

        return { success: true, message: "Report sent successfully" };
      } catch (error) {
        console.error("Failed to send email:", error);
        throw new Error("Failed to send report. Please try again.");
      }
    }),

  sendWhitepaper: publicProcedure
    .input(z.object({
        name: z.string().min(1),
        email: z.string().email(),
        company: z.string(),
        whitepaperSlug: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { name, email, company, whitepaperSlug } = input;

      // Map whitepaper slugs to titles and descriptions
      const whitepapers: Record<string, { title: string; description: string }> = {
        "ai-model-poisoning": {
          title: "Securing AI Training Pipelines Against Model Poisoning",
          description: "Comprehensive technical guide covering threat vectors, detection techniques, and defense strategies for AI model security.",
        },
        "zero-trust-aviation": {
          title: "Zero Trust Implementation for Aviation Operations Centers",
          description: "Technical implementation roadmap for Zero Trust architecture in aviation OCC environments with crew management systems.",
        },
      };

      const whitepaper = whitepapers[whitepaperSlug];
      if (!whitepaper) {
        throw new Error("Invalid whitepaper slug");
      }

      try {
        // Send whitepaper email to user
        await resend.emails.send({
          from: "Apex Meridian Security <security@apex-meridian.com>",
          to: email,
          subject: `Your Whitepaper: ${whitepaper.title}`,
          html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Your Whitepaper</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%); color: white; padding: 30px 20px; text-align: center;">
      <h1 style="margin: 0; font-size: 28px;">Your Whitepaper is Ready</h1>
    </div>
    <div style="padding: 30px 20px;">
      <p>Hi ${name},</p>
      <p>Thank you for your interest in our cybersecurity research. Here's your whitepaper:</p>
      <div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 15px; margin: 20px 0;">
        <h2 style="margin: 0 0 10px 0; color: #0ea5e9; font-size: 20px;">${whitepaper.title}</h2>
        <p style="margin: 0; color: #666;">${whitepaper.description}</p>
      </div>
      <p><strong>Access your whitepaper:</strong></p>
      <p style="text-align: center; margin: 30px 0;">
        <a href="https://apex-meridian.com/blog/${whitepaperSlug}" style="display: inline-block; background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">Read Online</a>
      </p>
      <p style="color: #666; font-size: 14px;">Note: The whitepaper is available as an online article. You can print it to PDF using your browser's print function (Ctrl/Cmd + P → Save as PDF).</p>
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
      <p><strong>Need security expertise?</strong></p>
      <p>Our team can help you design and implement enterprise-grade security architecture. <a href="https://apex-meridian.com/contact" style="color: #0ea5e9;">Contact us</a> to discuss your security needs.</p>
    </div>
    <div style="background: #f9fafb; padding: 20px; text-align: center; color: #666; font-size: 12px;">
      <p style="margin: 0;">Apex Meridian - AI-Native Enterprise Security</p>
      <p style="margin: 5px 0 0 0;">© 2026 Apex Meridian LLC. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
          `,
        });

        // Send lead notification to internal team
        await resend.emails.send({
          from: "Apex Meridian Leads <leads@apex-meridian.com>",
          to: "security@apex-meridian.com",
          subject: `New Whitepaper Download: ${whitepaper.title}`,
          html: `
            <h2>New Whitepaper Download Lead</h2>
            <p><strong>Whitepaper:</strong> ${whitepaper.title}</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Downloaded:</strong> ${new Date().toISOString()}</p>
          `,
        });

        // Track whitepaper download
        await trackEvent({
          eventType: 'whitepaper_download',
          resourceType: 'whitepaper',
          resourceId: whitepaperSlug,
          userEmail: email,
          metadata: { company, whitepaperTitle: whitepaper.title }
        });

        // Update lead score (+30 points)
        await updateLeadScore(email, 'whitepaper_download');

        return { success: true, message: "Whitepaper sent successfully" };
      } catch (error) {
        console.error("Failed to send whitepaper:", error);
        throw new Error("Failed to send whitepaper. Please try again.");
      }
    }),
});
