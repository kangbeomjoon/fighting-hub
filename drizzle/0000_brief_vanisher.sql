CREATE TABLE "articles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(200) NOT NULL,
	"content" text NOT NULL,
	"summary" varchar(500),
	"author_id" varchar(100) NOT NULL,
	"fight_id" uuid,
	"tags" varchar(200),
	"is_published" boolean DEFAULT false,
	"published_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "fighters" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"name_kr" varchar(100),
	"nationality" varchar(50),
	"weight_class" varchar(50),
	"record_wins" integer DEFAULT 0,
	"record_losses" integer DEFAULT 0,
	"record_draws" integer DEFAULT 0,
	"image_url" varchar(255),
	"reach" integer,
	"height" integer,
	"weight" integer,
	"stance" varchar(20),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "fights" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"fighter1_id" uuid,
	"fighter2_id" uuid,
	"event_name" varchar(200) NOT NULL,
	"event_name_kr" varchar(200),
	"fight_date" timestamp NOT NULL,
	"venue" varchar(200),
	"venue_kr" varchar(200),
	"weight_class" varchar(50),
	"result" varchar(100),
	"method" varchar(100),
	"round" integer,
	"time" varchar(10),
	"organization" varchar(50),
	"status" varchar(20) DEFAULT 'upcoming',
	"is_main_event" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "predictions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar(100) NOT NULL,
	"fight_id" uuid,
	"predicted_winner" uuid,
	"confidence" integer DEFAULT 50,
	"method" varchar(50),
	"round" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_fight_id_fights_id_fk" FOREIGN KEY ("fight_id") REFERENCES "public"."fights"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fights" ADD CONSTRAINT "fights_fighter1_id_fighters_id_fk" FOREIGN KEY ("fighter1_id") REFERENCES "public"."fighters"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fights" ADD CONSTRAINT "fights_fighter2_id_fighters_id_fk" FOREIGN KEY ("fighter2_id") REFERENCES "public"."fighters"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "predictions" ADD CONSTRAINT "predictions_fight_id_fights_id_fk" FOREIGN KEY ("fight_id") REFERENCES "public"."fights"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "predictions" ADD CONSTRAINT "predictions_predicted_winner_fighters_id_fk" FOREIGN KEY ("predicted_winner") REFERENCES "public"."fighters"("id") ON DELETE no action ON UPDATE no action;