CREATE TABLE "user" (
	"username" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "user_pk" PRIMARY KEY ("username")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "job" (
	"job_id" serial PRIMARY KEY,
	"title" varchar(255),
	"summary" varchar(255),
	"url" varchar(255) NOT NULL,
	"company" varchar(255),
	"post_date" varchar(255),
	"salary" varchar(255),
	"is_easy_apply" BOOLEAN
);


CREATE TABLE "user_jobs" (
	"_id" serial,
	"username" varchar(255) NOT NULL,
	"job_id" int NOT NULL,
	"note" TEXT,
	"date_applied" DATE,
	"status" TEXT
);




ALTER TABLE "user_jobs" ADD CONSTRAINT "user_jobs_fk0" FOREIGN KEY ("username") REFERENCES "user"("username");
ALTER TABLE "user_jobs" ADD CONSTRAINT "user_jobs_fk1" FOREIGN KEY ("job_id") REFERENCES "job"("job_id");



