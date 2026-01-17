import { getDb } from "./db";
import { newsletterSubscribers } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export async function subscribeToNewsletter(data: {
  email: string;
  name?: string;
  interests?: string[];
}) {
  try {
    const db = await getDb();
    if (!db) return { success: false, error: "Database unavailable" };

    // Check if already subscribed
    const existing = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, data.email))
      .limit(1);

    if (existing.length > 0) {
      // If previously unsubscribed, reactivate
      if (existing[0].isActive === 0) {
        await db
          .update(newsletterSubscribers)
          .set({
            isActive: 1,
            name: data.name || existing[0].name,
            interests: data.interests ? JSON.stringify(data.interests) : existing[0].interests,
            subscribedAt: new Date(),
            unsubscribedAt: null,
          })
          .where(eq(newsletterSubscribers.email, data.email));
        
        return { success: true, message: "Resubscribed successfully" };
      }
      
      return { success: false, error: "Email already subscribed" };
    }

    // New subscription
    await db.insert(newsletterSubscribers).values({
      email: data.email,
      name: data.name,
      interests: data.interests ? JSON.stringify(data.interests) : null,
      isActive: 1,
    });

    return { success: true, message: "Subscribed successfully" };
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return { success: false, error: "Failed to subscribe" };
  }
}

export async function unsubscribeFromNewsletter(email: string) {
  try {
    const db = await getDb();
    if (!db) return { success: false, error: "Database unavailable" };
    const result = await db
      .update(newsletterSubscribers)
      .set({
        isActive: 0,
        unsubscribedAt: new Date(),
      })
      .where(eq(newsletterSubscribers.email, email));

    return { success: true, message: "Unsubscribed successfully" };
  } catch (error) {
    console.error("Newsletter unsubscribe error:", error);
    return { success: false, error: "Failed to unsubscribe" };
  }
}

export async function getAllSubscribers() {
  try {
    const db = await getDb();
    if (!db) return [];
    const subscribers = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.isActive, 1));

    return subscribers.map((sub: any) => ({
      ...sub,
      interests: sub.interests ? JSON.parse(sub.interests) : [],
    }));
  } catch (error) {
    console.error("Get subscribers error:", error);
    return [];
  }
}

export async function updateLastEmailSent(email: string) {
  try {
    const db = await getDb();
    if (!db) return { success: false };
    await db
      .update(newsletterSubscribers)
      .set({
        lastEmailSent: new Date(),
      })
      .where(eq(newsletterSubscribers.email, email));

    return { success: true };
  } catch (error) {
    console.error("Update last email sent error:", error);
    return { success: false };
  }
}
