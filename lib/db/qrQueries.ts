import { db } from "./drizzle"; // Import your Drizzle database instance
import { qrCodes, linkPage, QrCode, NewLinkPage, Link } from "./schema"; // Import your schema definitions
import { eq, and, isNull, desc } from "drizzle-orm";
import { unstable_noStore as noStore } from "next/cache";

// --- QR Codes CRUD ---

// Create a new QR Code
// Todo: Impliment below
type NewQrCode = Omit<QrCode, "id" | "uuid" | "createdAt" | "updatedAt">;

export async function createQrCode(qrCodeData: NewQrCode): Promise<QrCode> {
  noStore();
  try {
    const result = await db.insert(qrCodes).values(qrCodeData).returning();
    if (result.length === 0) {
      throw new Error("Failed to create QR Code");
    }
    return result[0];
  } catch (error) {
    console.error("Error creating QR code:", error);
    throw new Error("Database error: Failed to create QR code"); // Re-throw for handling in the calling function
  }
}

// Get all QR Codes by teamId
export async function getQrCodesByTeamId(teamId: number): Promise<QrCode[]> {
  noStore();
  try {
    const result = await db
      .select()
      .from(qrCodes)
      .where(and(eq(qrCodes.teamId, teamId), isNull(qrCodes.deletedAt)));
    return result;
  } catch (error) {
    console.error("Error fetching QR codes by teamId:", error);
    throw new Error("Database error: Failed to fetch QR codes");
  }
}

// Get a single QR Code by ID
export async function getQrCodeById(uuid: string): Promise<QrCode | null> {
  noStore();
  try {
    const result = await db
      .select()
      .from(qrCodes)
      .where(and(eq(qrCodes.uuid, uuid), isNull(qrCodes.deletedAt)))
      .limit(1);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("Error fetching QR code by ID:", error);
    throw new Error("Database error: Failed to fetch QR code");
  }
}

// Update a QR Code
export async function updateQrCode(
  id: number,
  updateData: Partial<QrCode>
): Promise<QrCode> {
  noStore();
  try {
    const result = await db
      .update(qrCodes)
      .set({ ...updateData, updatedAt: new Date() })
      .where(and(eq(qrCodes.id, id), isNull(qrCodes.deletedAt)))
      .returning();
    if (result.length === 0) {
      throw new Error("Failed to update QR Code, or QR code not found");
    }
    return result[0];
  } catch (error) {
    console.error("Error updating QR code:", error);
    throw new Error("Database error: Failed to update QR code");
  }
}

// Delete a QR Code (soft delete)
export async function deleteQrCode(id: number): Promise<QrCode> {
  noStore();
  try {
    const result = await db
      .update(qrCodes)
      .set({ deletedAt: new Date(), updatedAt: new Date() })
      .where(eq(qrCodes.id, id))
      .returning();
    if (result.length === 0) {
      throw new Error("Failed to delete QR Code, or QR code not found");
    }
    return result[0];
  } catch (error) {
    console.error("Error deleting QR code:", error);
    throw new Error("Database error: Failed to delete QR code");
  }
}

// --- Link Page CRUD ---

// Create a new Link Page
export async function createLinkPage(linkPageData: NewLinkPage): Promise<Link> {
  noStore();
  try {
    const result = await db.insert(linkPage).values(linkPageData).returning();
    if (result.length === 0) {
      throw new Error("Failed to create Link Page");
    }
    return result[0];
  } catch (error) {
    console.error("Error creating link page:", error);
    throw new Error("Database error: Failed to create link page");
  }
}

// Get all Link Pages by qrId
export async function getLinkPagesByQrId(qrId: number): Promise<Link[]> {
  noStore();
  try {
    const result = await db
      .select()
      .from(linkPage)
      .where(and(eq(linkPage.qrId, qrId), isNull(linkPage.deletedAt)));
    return result;
  } catch (error) {
    console.error("Error fetching link pages by qrId:", error);
    throw new Error("Database error: Failed to fetch link pages");
  }
}

// Get a single Link Page by ID
export async function getLinkPageById(id: number): Promise<Link | null> {
  noStore();
  try {
    const result = await db
      .select()
      .from(linkPage)
      .where(and(eq(linkPage.id, id), isNull(linkPage.deletedAt)))
      .limit(1);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("Error fetching link page by ID:", error);
    throw new Error("Database error: Failed to fetch link page");
  }
}

// Update a Link Page
export async function updateLinkPage(
  id: number,
  updateData: Partial<Link>
): Promise<Link> {
  noStore();
  try {
    const result = await db
      .update(linkPage)
      .set({ ...updateData, updatedAt: new Date() })
      .where(and(eq(linkPage.id, id), isNull(linkPage.deletedAt)))
      .returning();
    if (result.length === 0) {
      throw new Error("Failed to update Link Page or Link Page not found");
    }
    return result[0];
  } catch (error) {
    console.error("Error updating link page:", error);
    throw new Error("Database error: Failed to update link page");
  }
}

// Delete a Link Page (soft delete)
export async function deleteLinkPage(id: number): Promise<Link> {
  noStore();
  try {
    const result = await db
      .update(linkPage)
      .set({ deletedAt: new Date(), updatedAt: new Date() })
      .where(eq(linkPage.id, id))
      .returning();
    if (result.length === 0) {
      throw new Error("Failed to delete Link Page, or Link Page not found");
    }
    return result[0];
  } catch (error) {
    console.error("Error deleting link page:", error);
    throw new Error("Database error: Failed to delete link page");
  }
}

// Example of how to call:

// const newQr = await createQrCode({
//   teamId: 1,
//   type: QrType.REDIRECT,
//   url: 'https://example.com',
//   friendlyName: 'My QR Code',
// });

// const qrCodes = await getQrCodesByTeamId(1);

// const linkPage = await getLinkPageById(1);

// if (linkPage) {
//   const updatedLinkPage = await updateLinkPage(linkPage.id, { pageName: 'New Page Name' });
// }

// await deleteQrCode(5)
