CREATE TABLE "accounts" (
	"id" serial PRIMARY KEY,
	"platform" text NOT NULL,
	"handle" text NOT NULL,
	"status" text DEFAULT 'connected' NOT NULL,
	"connected_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" serial PRIMARY KEY,
	"title" text NOT NULL,
	"content" text DEFAULT '' NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "publish_events" (
	"id" serial PRIMARY KEY,
	"post_id" integer NOT NULL,
	"platform" text NOT NULL,
	"status" text DEFAULT 'success' NOT NULL,
	"detail" text DEFAULT '',
	"published_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "publish_events" ADD CONSTRAINT "publish_events_post_id_posts_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id");