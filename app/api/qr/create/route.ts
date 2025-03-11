import { createQrCode, NewQrCode } from "@/lib/db/qrQueries";
import { getTeamForUser, getUser } from "@/lib/db/queries";
import { QrType } from "@/lib/db/schema";
import { NextRequest, NextResponse } from "next/server";
import QRCodeStyling from "qr-code-styling";

export async function POST(request: NextRequest) {
  try {
    const user = await getUser();
    if (!user) {
      throw Error("no user");
    }
    const team = await getTeamForUser(user.id);
    const teamId = team?.id;
    if (!teamId) {
      throw Error("no team");
    }
    const requestBody = (await request.json()) as {
      title: string;
      url: string;
      type: QrType;
      styling: QRCodeStyling["_options"];
    };
    // 4. Call your `createLinkPage` function (which interacts with the database).
    const value: NewQrCode = {
      teamId: teamId,
      friendlyName: requestBody.title,
      type: requestBody.type,
      styling: requestBody.styling,
      url: requestBody.url ?? null,
      disabled: false,
      deletedAt: null,
    };
    const qrCode = await createQrCode(value);

    // 5. Return the successful response.
    return NextResponse.json({ qrCode }, { status: 201 }); // 201 Created
  } catch (error: any) {
    // Handle errors (JSON parsing errors, database errors, etc.)
    console.error("API Route Error:", error);

    // Check for specific error types if possible (e.g., database connection errors).
    // This is a very generic error handler;  you'll want to refine it.

    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
