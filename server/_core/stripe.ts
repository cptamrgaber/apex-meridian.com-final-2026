import Stripe from 'stripe';

// Initialize Stripe with secret key
// You need to add STRIPE_SECRET_KEY to your environment variables
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2025-12-15.clover',
  typescript: true,
});

// Stripe price IDs mapping (you'll need to create these in Stripe Dashboard)
export const STRIPE_PRICES = {
  individual: {
    starter_monthly: 'price_starter_monthly',
    starter_annual: 'price_starter_annual',
    professional_monthly: 'price_professional_monthly',
    professional_annual: 'price_professional_annual',
    expert_monthly: 'price_expert_monthly',
    expert_annual: 'price_expert_annual',
  },
  smallBusiness: {
    startup_monthly: 'price_startup_monthly',
    startup_annual: 'price_startup_annual',
    growth_monthly: 'price_growth_monthly',
    growth_annual: 'price_growth_annual',
    scale_monthly: 'price_scale_monthly',
    scale_annual: 'price_scale_annual',
  },
  enterprise: {
    business_monthly: 'price_business_monthly',
    business_annual: 'price_business_annual',
    enterprise_monthly: 'price_enterprise_monthly',
    enterprise_annual: 'price_enterprise_annual',
  },
  saas: {
    chatbot_monthly: 'price_chatbot_monthly',
    chatbot_annual: 'price_chatbot_annual',
    document_monthly: 'price_document_monthly',
    document_annual: 'price_document_annual',
    analytics_monthly: 'price_analytics_monthly',
    analytics_annual: 'price_analytics_annual',
    voice_monthly: 'price_voice_monthly',
    voice_annual: 'price_voice_annual',
  },
};

// Helper function to create checkout session
export async function createCheckoutSession(params: {
  priceId: string;
  customerEmail?: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}) {
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: params.priceId,
        quantity: 1,
      },
    ],
    customer_email: params.customerEmail,
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    metadata: params.metadata,
    allow_promotion_codes: true,
    billing_address_collection: 'required',
    automatic_tax: {
      enabled: true,
    },
  });

  return session;
}

// Helper function to create customer portal session
export async function createCustomerPortalSession(params: {
  customerId: string;
  returnUrl: string;
}) {
  const session = await stripe.billingPortal.sessions.create({
    customer: params.customerId,
    return_url: params.returnUrl,
  });

  return session;
}

// Helper function to retrieve subscription
export async function getSubscription(subscriptionId: string) {
  return await stripe.subscriptions.retrieve(subscriptionId);
}

// Helper function to cancel subscription
export async function cancelSubscription(subscriptionId: string) {
  return await stripe.subscriptions.cancel(subscriptionId);
}

// Helper function to update subscription
export async function updateSubscription(
  subscriptionId: string,
  params: Stripe.SubscriptionUpdateParams
) {
  return await stripe.subscriptions.update(subscriptionId, params);
}
