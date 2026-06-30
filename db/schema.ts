import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

// A connected publishing destination.
//
// EchoPost is privacy-first: we deliberately store ONLY the public-facing
// identity of a connection (the platform and the account handle) plus its
// status. OAuth tokens, secrets, and any sensitive credential material are
// never persisted here — they are exchanged at publish time and discarded.
export const accounts = pgTable("accounts", {
  id: serial().primaryKey(),
  platform: text().notNull(), // medium | devto | linkedin | x | notion
  handle: text().notNull(), // public handle/username, never a secret
  status: text().notNull().default("connected"), // connected | revoked
  connectedAt: timestamp("connected_at").defaultNow(),
});

// A piece of content authored in EchoPost.
export const posts = pgTable("posts", {
  id: serial().primaryKey(),
  title: text().notNull(),
  content: text().notNull().default(""),
  status: text().notNull().default("draft"), // draft | published
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// The outcome of pushing a post to a single platform. One row per
// (post, platform) attempt, giving the dashboard a full delivery history.
export const publishEvents = pgTable("publish_events", {
  id: serial().primaryKey(),
  postId: integer("post_id")
    .notNull()
    .references(() => posts.id),
  platform: text().notNull(),
  status: text().notNull().default("success"), // success | failed
  detail: text().default(""),
  publishedAt: timestamp("published_at").defaultNow(),
});
