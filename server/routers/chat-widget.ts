import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { invokeLLM } from "../_core/llm";
import { Resend } from "resend";

const APEX_SYSTEM_PROMPT = `You are Apex, the AI assistant for Apex Meridian® — an AI technology solutions company headquartered in New Cairo, Egypt.

## About Apex Meridian
Apex Meridian is Egypt's first institutional deep-tech AI company, founded in 2022. We build proprietary AI systems for five critical industries:
1. **Aviation Intelligence** — Predictive AI that reduces aviation incidents by 67%, 94.7% fault detection accuracy, 12% fuel savings, 31% reduction in ground delays.
2. **Cybersecurity Shield** — Neutralises unknown threats in under 200ms. 99.2% detection rate, 0.003% false positive rate, 4.2 minute average containment time.
3. **Education & Cognitive Enhancement** — Adaptive AI raises student completion rates from 34% to 89% by analysing 47 behavioural signals per session.
4. **AGI Research Division** — One of the few MENA teams conducting original AGI research. 23 peer-reviewed papers, 8 patents filed, 14 university collaborations.
5. **AI Media Production** — AI-native studios produce broadcast-quality content 10x faster. 47 languages, 200+ voice profiles, 99.6% deepfake detection accuracy.

## Company Facts
- Founded: 2022 | HQ: New Cairo, Cairo, Egypt
- Team: 200+ engineers, researchers, and specialists
- Active clients: 47 institutional clients across 12 countries
- R&D investment: 35% of annual revenue
- Contact: +201 2 00 92 90 92 | apex-meridian.com

## Platform
The Apex Meridian digital platform has 102 pages serving 5 user groups: public visitors, enterprise clients, employees, researchers, and administrators. It includes a corporate website, employee portal, social platform, careers system, admin dashboards, and research collaboration hub.

## Careers
92 open positions across 13 departments: Engineering, R&D, Data Science, Cybersecurity, Aviation Operations, Education Technology, Media Production, Product Management, Sales, Marketing, Legal, Finance, HR.

## Your Role
- Answer questions about Apex Meridian's solutions, services, technology, and company
- Help visitors understand which solution fits their industry needs
- Guide potential clients, partners, investors, and job seekers
- Be professional, knowledgeable, and concise
- If asked about pricing, say "Please contact our sales team at apex-meridian.com/contact for a customised quote"
- If asked something you don't know, say "I'll connect you with our team — please visit apex-meridian.com/contact"
- Keep responses concise (2-4 sentences for most answers, up to 6 for complex topics)
- Always respond in the same language the user writes in (Arabic or English)`;

// High-intent keywords that trigger a sales team notification
const HIGH_INTENT_KEYWORDS = [
  // Pricing
  "price", "pricing", "cost", "costs", "quote", "quotation", "how much", "fee", "fees",
  "budget", "affordable", "expensive", "cheap", "rate", "rates", "subscription", "plan",
  "كم سعر", "سعر", "تكلفة", "تكاليف", "عرض سعر", "ميزانية", "اشتراك",
  // Investment
  "invest", "investment", "investor", "series a", "series b", "funding", "fund",
  "equity", "stake", "valuation", "raise", "capital", "venture", "vc", "angel",
  "استثمار", "مستثمر", "تمويل", "رأس المال", "حصة", "تقييم",
  // Partnership
  "partner", "partnership", "collaborate", "collaboration", "joint venture", "reseller",
  "distributor", "affiliate", "alliance", "integrate", "integration", "api access",
  "شراكة", "شريك", "تعاون", "توزيع", "تكامل",
  // Enterprise / Demo
  "demo", "trial", "pilot", "enterprise", "contract", "proposal", "rfp", "rfq",
  "procurement", "purchase", "buy", "acquire", "acquisition",
  "عرض توضيحي", "تجربة", "مؤسسة", "عقد", "شراء",
];

function detectHighIntent(messages: Array<{ role: string; content: string }>): {
  isHighIntent: boolean;
  category: string;
  triggeredKeywords: string[];
  userMessage: string;
} {
  // Only check the latest user message
  const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUserMessage) return { isHighIntent: false, category: "", triggeredKeywords: [], userMessage: "" };

  const text = lastUserMessage.content.toLowerCase();
  const triggered = HIGH_INTENT_KEYWORDS.filter((kw) => text.includes(kw.toLowerCase()));

  let category = "";
  if (triggered.some((kw) => ["price", "pricing", "cost", "costs", "quote", "quotation", "how much", "fee", "fees", "budget", "rate", "rates", "subscription", "plan", "كم سعر", "سعر", "تكلفة", "تكاليف", "عرض سعر", "ميزانية", "اشتراك"].includes(kw))) {
    category = "Pricing Inquiry";
  } else if (triggered.some((kw) => ["invest", "investment", "investor", "series a", "series b", "funding", "fund", "equity", "stake", "valuation", "raise", "capital", "venture", "vc", "angel", "استثمار", "مستثمر", "تمويل", "رأس المال", "حصة", "تقييم"].includes(kw))) {
    category = "Investment Inquiry";
  } else if (triggered.some((kw) => ["partner", "partnership", "collaborate", "collaboration", "joint venture", "reseller", "distributor", "affiliate", "alliance", "integrate", "integration", "api access", "شراكة", "شريك", "تعاون", "توزيع", "تكامل"].includes(kw))) {
    category = "Partnership Inquiry";
  } else if (triggered.length > 0) {
    category = "Enterprise / Demo Inquiry";
  }

  return {
    isHighIntent: triggered.length > 0,
    category,
    triggeredKeywords: triggered,
    userMessage: lastUserMessage.content,
  };
}

async function sendSalesNotification(params: {
  category: string;
  userMessage: string;
  triggeredKeywords: string[];
  conversationHistory: Array<{ role: string; content: string }>;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[ChatWidget] RESEND_API_KEY not set — skipping sales notification");
    return;
  }

  const resend = new Resend(apiKey);
  const timestamp = new Date().toLocaleString("en-GB", { timeZone: "Africa/Cairo" });

  // Build conversation HTML for context
  const conversationHtml = params.conversationHistory
    .map(
      (m) => `
      <div style="margin: 8px 0; padding: 10px 14px; border-radius: 8px; ${
        m.role === "user"
          ? "background:#e8f0fe; border-left: 3px solid #1565C0;"
          : "background:#f5f5f5; border-left: 3px solid #00BCD4;"
      }">
        <strong style="color:${m.role === "user" ? "#1565C0" : "#00838F"};">${m.role === "user" ? "🧑 Visitor" : "🤖 Apex AI"}</strong>
        <p style="margin: 4px 0 0; color:#333;">${m.content}</p>
      </div>`
    )
    .join("");

  await resend.emails.send({
    from: "Apex AI Assistant <onboarding@resend.dev>",
    to: ["sales@apex-meridian.com", "info@apex-meridian.com"],
    subject: `🔔 High-Intent Lead: ${params.category} — Apex AI Chat`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #1a1a2e;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0d1535, #1565C0); padding: 24px 28px; border-radius: 12px 12px 0 0;">
          <h1 style="color: #00E5FF; margin: 0; font-size: 20px;">🔔 High-Intent Chat Lead</h1>
          <p style="color: #90CAF9; margin: 6px 0 0; font-size: 14px;">Apex Meridian AI Assistant — Sales Notification</p>
        </div>

        <!-- Alert Summary -->
        <div style="background: #fff8e1; border: 1px solid #FFD54F; padding: 16px 24px; margin: 0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 6px 0; font-size: 14px;"><strong>Category:</strong></td>
              <td style="padding: 6px 0; font-size: 14px; color: #E65100;"><strong>${params.category}</strong></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-size: 14px;"><strong>Triggered Keywords:</strong></td>
              <td style="padding: 6px 0; font-size: 14px; color: #555;">${params.triggeredKeywords.join(", ")}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-size: 14px;"><strong>Time (Cairo):</strong></td>
              <td style="padding: 6px 0; font-size: 14px; color: #555;">${timestamp}</td>
            </tr>
          </table>
        </div>

        <!-- Visitor Message -->
        <div style="background: #ffffff; border: 1px solid #e0e0e0; border-top: none; padding: 20px 24px;">
          <h3 style="color: #1565C0; margin: 0 0 10px;">Visitor's Message</h3>
          <div style="background: #e8f0fe; border-left: 4px solid #1565C0; padding: 12px 16px; border-radius: 4px; font-size: 15px; color: #1a1a2e;">
            "${params.userMessage}"
          </div>
        </div>

        <!-- Conversation History -->
        <div style="background: #ffffff; border: 1px solid #e0e0e0; border-top: none; padding: 20px 24px;">
          <h3 style="color: #1565C0; margin: 0 0 12px;">Full Conversation</h3>
          ${conversationHtml}
        </div>

        <!-- Action Buttons -->
        <div style="background: #f5f5f5; border: 1px solid #e0e0e0; border-top: none; padding: 20px 24px; border-radius: 0 0 12px 12px; text-align: center;">
          <p style="color: #555; font-size: 14px; margin: 0 0 14px;">Follow up with this lead promptly</p>
          <a href="https://apex-meridian.com/contact" style="display: inline-block; background: linear-gradient(135deg, #00E5FF, #1565C0); color: #0a0f2e; font-weight: bold; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-size: 14px;">
            Open Contact Dashboard →
          </a>
        </div>

        <!-- Footer -->
        <p style="text-align: center; color: #aaa; font-size: 11px; margin-top: 16px;">
          This notification was generated automatically by the Apex Meridian AI Chat Assistant.<br>
          A p e x - M e r i d i a n ® LLC · New Cairo, Egypt
        </p>
      </div>
    `,
  });

  console.log(`[ChatWidget] Sales notification sent for category: ${params.category}`);
}

export const chatWidgetRouter = router({
  sendMessage: publicProcedure
    .input(
      z.object({
        messages: z.array(
          z.object({
            role: z.enum(["user", "assistant"]),
            content: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      // 1. Detect high-intent keywords in the latest user message
      const intentResult = detectHighIntent(input.messages);

      // 2. Get AI response
      const response = await invokeLLM({
        messages: [
          { role: "system", content: APEX_SYSTEM_PROMPT },
          ...input.messages,
        ],
      });

      const rawContent = response.choices?.[0]?.message?.content;
      const content =
        typeof rawContent === "string"
          ? rawContent
          : "I'm sorry, I couldn't process your request. Please try again or contact us at apex-meridian.com/contact";

      // 3. Fire-and-forget sales notification (non-blocking)
      if (intentResult.isHighIntent) {
        sendSalesNotification({
          category: intentResult.category,
          userMessage: intentResult.userMessage,
          triggeredKeywords: intentResult.triggeredKeywords,
          conversationHistory: input.messages,
        }).catch((err) => {
          console.error("[ChatWidget] Failed to send sales notification:", err);
        });
      }

      return {
        content,
        leadCaptured: intentResult.isHighIntent,
        leadCategory: intentResult.isHighIntent ? intentResult.category : null,
      };
    }),
});
