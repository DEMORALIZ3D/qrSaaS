import { createLinkPage, createLinkPageWithQr } from "@/lib/db/qrQueries";
import { getUser, getTeamForUser } from "@/lib/db/queries";
import { NewLinkPage } from "@/lib/db/schema";
import { PageLinkOptions } from "@/lib/linkPage";
import { create } from "domain";
import { NextRequest, NextResponse } from "next/server";

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
      links: {
        data: NewLinkPage["links"];
        theme: PageLinkOptions["links"]["theme"];
      };
    } & Omit<PageLinkOptions, "links">;

    // 2. Basic Input Validation (Without Zod - Limited)
    if (!requestBody.bio?.title || !requestBody.links?.data) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: bio.title and links.data are required",
        },
        { status: 400 } // Bad Request
      );
    }

    if (!Array.isArray(requestBody.links.data)) {
      return NextResponse.json(
        { error: "links.data must be an array" },
        { status: 400 }
      );
    }

    // Add more basic checks as needed (e.g., URL format, string lengths), but
    // remember this is *not* as robust as Zod.

    // 3. Transform the data for `createLinkPage`.
    const createLinkPageOptions: {
      links: NewLinkPage["links"];
    } & Omit<NewLinkPage, "links"> = {
      pageName: requestBody.bio.title,
      description: requestBody.bio.description,
      links: requestBody.links.data, // Already in the correct format.
      styling: {
        background: requestBody.background.color,
        coverArea: requestBody.coverArea,
        avatarArea: requestBody.avatar,
        linksArea: requestBody.links.theme,
      },
    };

    // 4. Call your `createLinkPage` function (which interacts with the database).

    const linkPage = await createLinkPageWithQr(teamId, createLinkPageOptions);

    // 5. Return the successful response.
    return NextResponse.json({ linkPage }, { status: 201 }); // 201 Created
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
