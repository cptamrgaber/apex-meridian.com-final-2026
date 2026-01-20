import { Request, Response } from "express";
import Stripe from "stripe";
import { stripe } from "../_core/stripe";
import { getDb } from "../db";
import { subscriptions, paymentTransactions, stripeCustomers } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function handleStripeWebhook(req: Request, res: Response) {
  const sig = req.headers["stripe-signature"];

  if (!sig) {
    return res.status(400).send("No signature");
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed:`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  const db = await getDb();
  if (!db) {
    console.error("Database not available");
    return res.status(500).send("Database error");
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session, db);
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdate(subscription, db);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription, db);
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentSucceeded(invoice, db);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(invoice, db);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(500).send("Webhook processing error");
  }
}

async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session,
  db: NonNullable<Awaited<ReturnType<typeof getDb>>>
) {
  const metadata = session.metadata;
  if (!metadata) return;

  const userId = parseInt(metadata.userId);
  const planCategory = metadata.planCategory;
  const planName = metadata.planName;
  const billingPeriod = metadata.billingPeriod as "monthly" | "annual";

  if (!session.subscription || !session.customer) return;

  const subscriptionId = session.subscription as string;
  const customerId = session.customer as string;

  // Get subscription details from Stripe
  const stripeSubscription = await stripe.subscriptions.retrieve(subscriptionId);

  // Calculate period dates
  const currentPeriodStart = new Date((stripeSubscription as any).current_period_start * 1000);
  const currentPeriodEnd = new Date((stripeSubscription as any).current_period_end * 1000);

  // Get amount from subscription
  const amount = stripeSubscription.items.data[0]?.price.unit_amount || 0;

  // Create subscription in database
  await db.insert(subscriptions).values({
    userId,
    stripeCustomerId: customerId,
    stripeSubscriptionId: subscriptionId,
    planCategory,
    planName,
    billingPeriod,
    amount,
    currency: "EGP",
    status: "active",
    currentPeriodStart,
    currentPeriodEnd,
    cancelAtPeriodEnd: 0,
  });

  // Create payment transaction
  await db.insert(paymentTransactions).values({
    userId,
    paymentMethod: "stripe",
    amount,
    currency: "EGP",
    status: "completed",
    transactionId: session.payment_intent as string,
    metadata: JSON.stringify({
      sessionId: session.id,
      subscriptionId,
      planCategory,
      planName,
    }),
  });

  console.log(`Subscription created for user ${userId}: ${subscriptionId}`);
}

async function handleSubscriptionUpdate(
  stripeSubscription: Stripe.Subscription,
  db: NonNullable<Awaited<ReturnType<typeof getDb>>>
) {
  const subscriptionId = stripeSubscription.id;

  // Find subscription in database
  const existingSubscriptions = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.stripeSubscriptionId, subscriptionId))
    .limit(1);

  if (existingSubscriptions.length === 0) {
    console.log(`Subscription ${subscriptionId} not found in database`);
    return;
  }

  const currentPeriodStart = new Date((stripeSubscription as any).current_period_start * 1000);
  const currentPeriodEnd = new Date((stripeSubscription as any).current_period_end * 1000);
  const status = stripeSubscription.status as "active" | "canceled" | "past_due" | "unpaid" | "trialing";

  // Update subscription
  await db
    .update(subscriptions)
    .set({
      status,
      currentPeriodStart,
      currentPeriodEnd,
      cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end ? 1 : 0,
      updatedAt: new Date(),
    })
    .where(eq(subscriptions.stripeSubscriptionId, subscriptionId));

  console.log(`Subscription updated: ${subscriptionId}, status: ${status}`);
}

async function handleSubscriptionDeleted(
  stripeSubscription: Stripe.Subscription,
  db: NonNullable<Awaited<ReturnType<typeof getDb>>>
) {
  const subscriptionId = stripeSubscription.id;

  // Update subscription status to canceled
  await db
    .update(subscriptions)
    .set({
      status: "canceled",
      updatedAt: new Date(),
    })
    .where(eq(subscriptions.stripeSubscriptionId, subscriptionId));

  console.log(`Subscription canceled: ${subscriptionId}`);
}

async function handlePaymentSucceeded(
  invoice: Stripe.Invoice,
  db: NonNullable<Awaited<ReturnType<typeof getDb>>>
) {
  const subscriptionId = typeof (invoice as any).subscription === 'string' 
    ? (invoice as any).subscription 
    : (invoice as any).subscription?.id;
  
  if (!subscriptionId) return;

  // Find subscription in database
  const existingSubscriptions = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.stripeSubscriptionId, subscriptionId))
    .limit(1);

  if (existingSubscriptions.length === 0) return;

  const subscription = existingSubscriptions[0];

  // Create payment transaction
  await db.insert(paymentTransactions).values({
    userId: subscription.userId,
    subscriptionId: subscription.id,
    paymentMethod: "stripe",
    amount: invoice.amount_paid,
    currency: "EGP",
    status: "completed",
    transactionId: ((invoice as any).payment_intent as string) || invoice.id,
    metadata: JSON.stringify({
      invoiceId: invoice.id,
      subscriptionId,
    }),
  });

  console.log(`Payment succeeded for subscription ${subscriptionId}: ${invoice.amount_paid}`);
}

async function handlePaymentFailed(
  invoice: Stripe.Invoice,
  db: NonNullable<Awaited<ReturnType<typeof getDb>>>
) {
  const subscriptionId = typeof (invoice as any).subscription === 'string' 
    ? (invoice as any).subscription 
    : (invoice as any).subscription?.id;
  
  if (!subscriptionId) return;

  // Find subscription in database
  const existingSubscriptions = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.stripeSubscriptionId, subscriptionId))
    .limit(1);

  if (existingSubscriptions.length === 0) return;

  const subscription = existingSubscriptions[0];

  // Update subscription status
  await db
    .update(subscriptions)
    .set({
      status: "past_due",
      updatedAt: new Date(),
    })
    .where(eq(subscriptions.id, subscription.id));

  // Create failed payment transaction
  await db.insert(paymentTransactions).values({
    userId: subscription.userId,
    subscriptionId: subscription.id,
    paymentMethod: "stripe",
    amount: invoice.amount_due,
    currency: "EGP",
    status: "failed",
    transactionId: ((invoice as any).payment_intent as string) || invoice.id,
    metadata: JSON.stringify({
      invoiceId: invoice.id,
      subscriptionId,
      failureReason: invoice.last_finalization_error?.message || "Payment failed",
    }),
  });

  console.log(`Payment failed for subscription ${subscriptionId}`);
}
