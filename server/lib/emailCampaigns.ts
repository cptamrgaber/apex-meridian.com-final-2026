import { getDb } from "../db";
import { Resend } from "resend";
import { env } from "../_core/env";

const resend = new Resend(env.RESEND_API_KEY);

// Email templates for each milestone
const EMAIL_TEMPLATES = {
  milestone_40: {
    subject: "Unlock Advanced Security Insights - Apex Meridian Resources",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1e3a8a;">Enhance Your Security Knowledge</h1>
        <p>Thank you for your interest in Apex Meridian's cybersecurity solutions!</p>
        
        <p>Based on your engagement, we've curated some educational resources that might interest you:</p>
        
        <ul>
          <li><a href="https://apex-meridian.manus.space/blog/ai-model-poisoning">Securing AI Training Pipelines Against Model Poisoning</a></li>
          <li><a href="https://apex-meridian.manus.space/blog/zero-trust-aviation">Zero Trust Implementation for Aviation Operations</a></li>
          <li><a href="https://apex-meridian.manus.space/security-resources">Security Resource Hub</a></li>
        </ul>
        
        <p>These technical articles dive deep into modern security challenges and solutions.</p>
        
        <p>Best regards,<br>The Apex Meridian Team</p>
      </div>
    `,
  },
  milestone_60: {
    subject: "See How We've Helped Companies Like Yours - Case Studies",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1e3a8a;">Real Results from Real Clients</h1>
        <p>We've noticed your continued interest in our security solutions!</p>
        
        <p>Here are some success stories from organizations we've helped:</p>
        
        <div style="background: #f3f4f6; padding: 20px; margin: 20px 0; border-radius: 8px;">
          <h3>Regional Aviation Carrier</h3>
          <p><strong>94% reduction</strong> in security incidents</p>
          <p><strong>Sub-5-minute</strong> incident response time</p>
          <p><a href="https://apex-meridian.manus.space/case-studies/aviation-security">Read Full Case Study →</a></p>
        </div>
        
        <div style="background: #f3f4f6; padding: 20px; margin: 20px 0; border-radius: 8px;">
          <h3>AM-AV Operations Control Center</h3>
          <p><strong>70% time savings</strong> in crew scheduling</p>
          <p><strong>Zero compliance violations</strong> in 6 months</p>
          <p><a href="https://apex-meridian.manus.space/case-studies/am-av-regional-carrier">Read Full Case Study →</a></p>
        </div>
        
        <p>Want to discuss how we can achieve similar results for your organization?</p>
        
        <p>Best regards,<br>The Apex Meridian Team</p>
      </div>
    `,
  },
  milestone_80: {
    subject: "Let's Discuss Your Security Needs - Schedule a Consultation",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1e3a8a;">Ready to Take the Next Step?</h1>
        <p>Your engagement with our security resources shows you're serious about protecting your organization.</p>
        
        <p><strong>We'd like to offer you a complimentary 30-minute security consultation</strong> where we can:</p>
        
        <ul>
          <li>Review your current security posture</li>
          <li>Identify potential vulnerabilities</li>
          <li>Discuss tailored solutions for your industry</li>
          <li>Answer any questions about our services</li>
        </ul>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://apex-meridian.manus.space/contact" 
             style="background: #3b82f6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Schedule Your Consultation
          </a>
        </div>
        
        <p>Our security experts are standing by to help you build a robust defense strategy.</p>
        
        <p>Best regards,<br>The Apex Meridian Team</p>
        <p style="color: #666; font-size: 14px;">+201 2 00 92 90 92 | info@apex-meridian.com</p>
      </div>
    `,
  },
};

// Check and send nurture emails based on lead score
export async function checkAndSendNurtureEmails() {
  const db = await getDb();
  
  try {
    // Get all leads with scores at milestone thresholds
    const leads = await db.query.leads.findMany({
      where: (leads, { gte, lt }) => gte(leads.score, 40),
    });

    for (const lead of leads) {
      // Determine which milestone email to send
      let milestone: keyof typeof EMAIL_TEMPLATES | null = null;
      
      if (lead.score >= 80 && !lead.lastEmailSent?.includes('milestone_80')) {
        milestone = 'milestone_80';
      } else if (lead.score >= 60 && !lead.lastEmailSent?.includes('milestone_60')) {
        milestone = 'milestone_60';
      } else if (lead.score >= 40 && !lead.lastEmailSent?.includes('milestone_40')) {
        milestone = 'milestone_40';
      }

      if (milestone) {
        const template = EMAIL_TEMPLATES[milestone];
        
        try {
          await resend.emails.send({
            from: "Apex Meridian <noreply@apex-meridian.com>",
            to: lead.email,
            subject: template.subject,
            html: template.html,
          });

          // Update lead record with last email sent
          await db
            .update(db.schema.leads)
            .set({
              lastEmailSent: milestone,
              updatedAt: new Date(),
            })
            .where(db.eq(db.schema.leads.id, lead.id));

          console.log(`Sent ${milestone} email to ${lead.email}`);
        } catch (error) {
          console.error(`Failed to send email to ${lead.email}:`, error);
        }
      }
    }
  } catch (error) {
    console.error("Error checking and sending nurture emails:", error);
  }
}

// Schedule this function to run periodically (e.g., every hour)
// You can use a cron job or Node.js scheduler like node-cron
