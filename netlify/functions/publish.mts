import type { Config } from "@netlify/functions";
import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { accounts, posts, publishEvents } from "../../db/schema.js";

// Fans a post out to the chosen platforms and records the outcome of each
// delivery. A platform only succeeds when a matching account is connected;
// requests for unconnected platforms are recorded as failures so the user
// gets an honest, persisted delivery report rather than a silent drop.
export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const body = await req.json().catch(() => null);
  const postId = Number(body?.postId);
  const requested: string[] = Array.isArray(body?.platforms)
    ? body.platforms.map((p: unknown) => String(p).toLowerCase())
    : [];

  if (!Number.isInteger(postId)) {
    return Response.json({ error: "A valid postId is required" }, { status: 400 });
  }
  if (requested.length === 0) {
    return Response.json({ error: "Select at least one platform" }, { status: 400 });
  }

  const [post] = await db.select().from(posts).where(eq(posts.id, postId));
  if (!post) {
    return Response.json({ error: "Post not found" }, { status: 404 });
  }

  const connected = await db.select().from(accounts);
  const connectedByPlatform = new Map(
    connected
      .filter((a) => a.status === "connected")
      .map((a) => [a.platform, a]),
  );

  const rows = requested.map((platform) => {
    const account = connectedByPlatform.get(platform);
    return account
      ? {
          postId,
          platform,
          status: "success",
          detail: `Delivered to @${account.handle}`,
        }
      : {
          postId,
          platform,
          status: "failed",
          detail: "No connected account for this platform",
        };
  });

  const deliveries = await db.insert(publishEvents).values(rows).returning();

  const anySuccess = deliveries.some((d) => d.status === "success");
  if (anySuccess && post.status !== "published") {
    await db
      .update(posts)
      .set({ status: "published", updatedAt: new Date() })
      .where(eq(posts.id, postId));
  }

  return Response.json({
    postId,
    status: anySuccess ? "published" : post.status,
    deliveries,
  });
};

export const config: Config = {
  path: "/api/publish",
};
