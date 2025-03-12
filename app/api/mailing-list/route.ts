import { NextRequest, NextResponse } from "next/server";
import { NewSubscriber } from "@/lib/db/schema";
import {
  addSubscriber,
  getSubscriberByEmail,
  updateSubscriber,
  deleteSubscriber,
  unsubscribe,
} from "@/lib/db/subscriberQueries";

export async function POST(request: NextRequest) {
  try {
    const newSubscriberData: NewSubscriber = await request.json();

    // Basic validation (use Zod or similar for production)
    if (!newSubscriberData.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const newSubscriber = await addSubscriber(newSubscriberData);
    return NextResponse.json({ subscriber: newSubscriber }, { status: 201 }); // 201 Created
  } catch (error: any) {
    console.error("API Route Error (POST):", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { email, ...updates } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required for updates" },
        { status: 400 }
      );
    }

    // Check if subscriber exists (optional, but good practice)
    const existingSubscriber = await getSubscriberByEmail(email);
    if (!existingSubscriber) {
      return NextResponse.json(
        { error: "Subscriber not found" },
        { status: 404 }
      );
    }

    const updatedSubscriber = await updateSubscriber(email, updates);
    return NextResponse.json(
      { subscriber: updatedSubscriber },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("API Route Error (PUT):", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Get parameters from the body
    const { email, hardDelete } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Check if subscriber exists
    const existingSubscriber = await getSubscriberByEmail(email);
    if (!existingSubscriber) {
      return NextResponse.json(
        { error: "Subscriber not found" },
        { status: 404 }
      );
    }

    if (hardDelete) {
      // Hard delete
      await deleteSubscriber(email);
      return NextResponse.json({}, { status: 204 }); // 204 No Content
    } else {
      // Soft Delete (unsubscribe)
      const unsubscribedSubscriber = await unsubscribe(email);
      return NextResponse.json(
        { subscriber: unsubscribedSubscriber },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error("API Route Error (DELETE):", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
