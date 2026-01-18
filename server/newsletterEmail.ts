import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(email: string, name?: string) {
  try {
    const displayName = name || "there";
    
    await resend.emails.send({
      from: "Apex Meridian Research <research@apex-meridian.net>",
      to: email,
      subject: "Welcome to Apex Meridian Research Newsletter",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #1e40af 0%, #06b6d4 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
              .button { display: inline-block; background: #0891b2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
              .footer { text-align: center; padding: 20px; color: #64748b; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">Welcome to Apex Meridian Research!</h1>
              </div>
              <div class="content">
                <p>Hi ${displayName},</p>
                
                <p>Thank you for subscribing to the Apex Meridian Research Newsletter! We're thrilled to have you join our community of researchers, innovators, and AI enthusiasts.</p>
                
                <p><strong>What you'll receive:</strong></p>
                <ul>
                  <li>📚 Latest research publications and papers</li>
                  <li>🔬 Behind-the-scenes insights from our partnerships</li>
                  <li>🚀 Technology news and AI breakthroughs</li>
                  <li>🎓 Educational resources and learning materials</li>
                  <li>🤝 Collaboration opportunities</li>
                </ul>
                
                <p>Our monthly digest will keep you updated on the cutting-edge work happening across our global research network, with a special focus on Egyptian and African AI innovation.</p>
                
                <div style="text-align: center;">
                  <a href="https://apex-meridian.net/research/blog" class="button">Explore Our Research Blog</a>
                </div>
                
                <p>Have questions or want to collaborate? Reply to this email or visit our <a href="https://apex-meridian.net/research/collaboration">collaboration page</a>.</p>
                
                <p>Best regards,<br>
                <strong>The Apex Meridian Research Team</strong></p>
              </div>
              <div class="footer">
                <p>Apex Meridian LLC | Transforming Industries with Artificial Intelligence</p>
                <p><a href="https://apex-meridian.net">apex-meridian.net</a> | +201 2 00 92 90 92</p>
                <p style="font-size: 12px; color: #94a3b8;">
                  You're receiving this because you subscribed to our newsletter.<br>
                  <a href="https://apex-meridian.net/unsubscribe?email=${encodeURIComponent(email)}">Unsubscribe</a>
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });
    
    return { success: true };
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    return { success: false, error: String(error) };
  }
}

export async function sendMonthlyDigest(subscribers: Array<{ email: string; name?: string | null }>) {
  const results = [];
  
  for (const subscriber of subscribers) {
    try {
      const displayName = subscriber.name || "there";
      
      await resend.emails.send({
        from: "Apex Meridian Research <research@apex-meridian.net>",
        to: subscriber.email,
        subject: "Monthly Research Digest - Latest AI Breakthroughs",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #1e40af 0%, #06b6d4 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
                .content { background: #f8fafc; padding: 30px; }
                .article { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #0891b2; }
                .article h3 { margin-top: 0; color: #1e40af; }
                .button { display: inline-block; background: #0891b2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
                .footer { text-align: center; padding: 20px; color: #64748b; font-size: 14px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1 style="margin: 0;">Monthly Research Digest</h1>
                  <p style="margin: 10px 0 0 0;">Latest insights from Apex Meridian Research Network</p>
                </div>
                <div class="content">
                  <p>Hi ${displayName},</p>
                  
                  <p>Here's what's new in AI research and technology this month:</p>
                  
                  <div class="article">
                    <h3>🔬 AraBERT: Revolutionizing Arabic NLP</h3>
                    <p>Discover how our partnership with AUC is advancing Arabic language understanding through transformer models trained on 200M sentences.</p>
                    <a href="https://apex-meridian.net/research/blog/arabert-arabic-nlp" class="button">Read More</a>
                  </div>
                  
                  <div class="article">
                    <h3>⚛️ Quantum Computing Breakthrough at Zewail City</h3>
                    <p>Explore the latest advances in photonic quantum computing and Egypt's growing role in quantum research.</p>
                    <a href="https://apex-meridian.net/research/blog/photonic-quantum-computing" class="button">Read More</a>
                  </div>
                  
                  <div class="article">
                    <h3>📊 New Research Metrics Dashboard</h3>
                    <p>Visualize our research impact with interactive charts showing publication trends, citation growth, and geographic collaboration.</p>
                    <a href="https://apex-meridian.net/research/metrics" class="button">View Dashboard</a>
                  </div>
                  
                  <div style="background: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="margin-top: 0;">📚 New in Our Library</h3>
                    <p>We've added 35+ resources to our AI Library, including books, research papers, and courses in English and Arabic.</p>
                    <a href="https://apex-meridian.net/library" class="button">Browse Library</a>
                  </div>
                  
                  <p>Stay connected and explore more:</p>
                  <ul>
                    <li><a href="https://apex-meridian.net/research/publications">Publications Repository</a></li>
                    <li><a href="https://apex-meridian.net/researchers">Research Team</a></li>
                    <li><a href="https://apex-meridian.net/news">Technology News</a></li>
                  </ul>
                  
                  <p>Best regards,<br>
                  <strong>The Apex Meridian Research Team</strong></p>
                </div>
                <div class="footer">
                  <p>Apex Meridian LLC | Transforming Industries with Artificial Intelligence</p>
                  <p><a href="https://apex-meridian.net">apex-meridian.net</a> | +201 2 00 92 90 92</p>
                  <p style="font-size: 12px; color: #94a3b8;">
                    <a href="https://apex-meridian.net/unsubscribe?email=${encodeURIComponent(subscriber.email)}">Unsubscribe</a>
                  </p>
                </div>
              </div>
            </body>
          </html>
        `,
      });
      
      results.push({ email: subscriber.email, success: true });
    } catch (error) {
      console.error(`Failed to send digest to ${subscriber.email}:`, error);
      results.push({ email: subscriber.email, success: false, error: String(error) });
    }
  }
  
  return results;
}
