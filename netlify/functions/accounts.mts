import type { Config, Context } from "@netlify/functions";
import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { accounts } from "../../db/schema.js";

const PLATFORMS = ["medium", "devto", "linkedin", "x", "notion"];

// Manages publishing destinations. Only the public handle and connection
// status are ever stored — never tokens or secrets (see db/schema.ts).
export default async (req: Request, context: Context) => {
  if (req.method === "GET") {
    const rows = await db
      .select()
      .from(accounts)
      .orderBy(accounts.connectedAt);
    return Response.json(rows);
  }

  if (req.method === "POST") {
    const body = await req.json().catch(() => null);
    const platform = String(body?.platform || "").toLowerCase();
    const handle = String(body?.handle || "").trim();

    if (!PLATFORMS.includes(platform)) {
      return Response.json({ error: "Unknown platform" }, { status: 400 });
    }
    if (!handle) {
      return Response.json({ error: "A handle is required" }, { status: 400 });
    }

    // Re-connecting an existing platform refreshes its handle and status
    // rather than creating a duplicate destination.
    const [existing] = await db
      .select()
      .from(accounts)
      .where(eq(accounts.platform, platform));

    if (existing) {
      const [updated] = await db
        .update(accounts)
        .set({ handle, status: "connected" })
        .where(eq(accounts.id, existing.id))
        .returning();
      return Response.json(updated);
    }

    const [created] = await db
      .insert(accounts)
      .values({ platform, handle, status: "connected" })
      .returning();
    return Response.json(created, { status: 201 });
  }

  if (req.method === "DELETE") {
    const id = Number(context.params.id);
    if (!Number.isInteger(id)) {
      return Response.json({ error: "Invalid account id" }, { status: 400 });
    }
    await db.delete(accounts).where(eq(accounts.id, id));
    return new Response(null, { status: 204 });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: ["/api/accounts", "/api/accounts/:id"],
};
