CREATE TYPE "public"."qr_type" AS ENUM('REDIRECT', 'WIFI', 'V_CARD', 'LINK_PAGE', 'SURVEY', 'PRODUCT_PAGE');--> statement-breakpoint
CREATE TABLE "link_page" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid(),
	"qr_id" integer NOT NULL,
	"page_name" varchar(100),
	"links" json DEFAULT '[]'::json NOT NULL,
	"social_links" json,
	"description" varchar(1500),
	"styling" json,
	"disabled" boolean,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "qr_codes" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid(),
	"team_id" integer NOT NULL,
	"friendly_name" varchar(100),
	"type" "qr_type" NOT NULL,
	"url" varchar(500),
	"disabled" boolean,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "link_page" ADD CONSTRAINT "link_page_qr_id_qr_codes_id_fk" FOREIGN KEY ("qr_id") REFERENCES "public"."qr_codes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "qr_codes" ADD CONSTRAINT "qr_codes_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;