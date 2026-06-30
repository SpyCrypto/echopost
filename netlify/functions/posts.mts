import type { Config, Context } from "@netlify/functions";
import { desc, eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { posts, publishEvents } from "../../db/schema.js";

// CRUD for authored content. Each post is returned together with its
// delivery history so the dashboard can render status without extra calls.
export default async (req: Request, context: Context) => {
  if (req.method === "GET") {
    const allPosts = await db
      .select()
      .from(posts)
      .orderBy(desc(posts.createdAt));

    const events = await db.select().from(publishEvents);
    const byPost = new Map<number, typeof events>();
    for (const ev of events) {
      const list = byPost.get(ev.postId) ?? [];
      list.push(ev);
      byPost.set(ev.postId, list);
    }

    const result = allPosts.map((p) => ({
      ...p,
      deliveries: byPost.get(p.id) ?? [],
    }));
    return Response.json(result);
  }

  if (req.method === "POST") {
    const body = await req.json().catch(() => null);
    const title = String(body?.title || "").trim();
    const content = String(body?.content || "");

    if (!title) {
      return Response.json({ error: "A title is required" }, { status: 400 });
    }

    const [created] = await db
      .insert(posts)
      .values({ title, content })
      .returning();
    return Response.json({ ...created, deliveries: [] }, { status: 201 });
  }

  if (req.method === "DELETE") {
    const id = Number(context.params.id);
    if (!Number.isInteger(id)) {
      return Response.json({ error: "Invalid post id" }, { status: 400 });
    }
    await db.delete(publishEvents).where(eq(publishEvents.postId, id));
    await db.delete(posts).where(eq(posts.id, id));
    return new Response(null, { status: 204 });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: ["/api/posts", "/api/posts/:id"],
};
