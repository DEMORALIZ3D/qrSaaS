import { db } from "./drizzle"; // Import your Drizzle database instance
import { subscribers, NewSubscriber, Subscriber } from "./schema"; // Import your schema and types
import { eq, sql } from "drizzle-orm";

// --- Create (Add a Subscriber) ---

export async function addSubscriber(
  newSubscriberData: NewSubscriber
): Promise<Subscriber> {
  try {
    // Insert the new subscriber and return the inserted row.
    const [newSubscriber] = await db
      .insert(subscribers)
      .values(newSubscriberData)
      .returning();

    if (!newSubscriber) {
      throw new Error("Failed to add subscriber"); // Or handle differently, e.g. return null.
    }

    return newSubscriber;
  } catch (error: any) {
    // Handle database errors (e.g., unique constraint violation)
    if (error.code === "23505") {
      // PostgreSQL unique violation error code
      throw new Error("Email already subscribed."); // More user-friendly message
    }
    console.error("Error adding subscriber:", error);
    throw new Error("Failed to add subscriber: " + error.message); // Or handle differently
  }
}

// --- Read (Get All Subscribers -  Optional, for admin panel, etc.) ---

export async function getAllSubscribers(): Promise<Subscriber[]> {
  try {
    const allSubscribers = await db.select().from(subscribers);
    return allSubscribers;
  } catch (error: any) {
    console.error("Error getting all subscribers", error);
    throw new Error("Failed to get subscribers: " + error.message);
  }
}

// --- Read (Get a Subscriber by Email) ---
export async function getSubscriberByEmail(
  email: string
): Promise<Subscriber | null> {
  try {
    const [subscriber] = await db
      .select()
      .from(subscribers)
      .where(eq(subscribers.email, email))
      .limit(1);
    return subscriber || null; // Return null if not found
  } catch (error: any) {
    console.error(`Error getting subscriber by email ${email}:`, error);
    throw new Error(
      `Failed to get subscriber by email ${email}: ${error.message}`
    );
  }
}

// --- Update (e.g., Change Subscription Status, Update Name) ---

export async function updateSubscriber(
  email: string,
  updates: Partial<NewSubscriber>
): Promise<Subscriber> {
  try {
    const [updatedSubscriber] = await db
      .update(subscribers)
      .set({ ...updates, updatedAt: new Date() }) // Always update updatedAt
      .where(eq(subscribers.email, email))
      .returning();

    if (!updatedSubscriber) {
      throw new Error(`Subscriber with email ${email} not found.`);
    }

    return updatedSubscriber;
  } catch (error: any) {
    console.error(`Error updating subscriber with email ${email}:`, error);
    throw new Error(`Failed to update subscriber: ${error.message}`);
  }
}

// --- Delete (Unsubscribe - Usually done by setting subscribed to false) ---
// You almost always want a soft-delete (unsubscribe) instead of a hard delete.

export async function unsubscribe(email: string): Promise<Subscriber> {
  return updateSubscriber(email, { subscribed: false }); // Reuse updateSubscriber
}

// --- Hard Delete (Remove a subscriber completely - Use with caution!) ---

export async function deleteSubscriber(email: string): Promise<void> {
  try {
    const result = await db
      .delete(subscribers)
      .where(eq(subscribers.email, email));

    //Check if any rows where deleted
    if (result.rowCount === 0) {
      throw new Error(`Could not find user with email: ${email}`);
    }
  } catch (error: any) {
    console.error(`Error deleting subscriber with email ${email}`, error);
    throw new Error(`Failed to delete subscriber: ${error.message}`);
  }
}
