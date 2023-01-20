CREATE TABLE "movie" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"platformId" integer NOT NULL,
	"genreId" integer NOT NULL,
	"watchedStatus" BOOLEAN NOT NULL DEFAULT 'false'
);



CREATE TABLE "genre" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL UNIQUE
);



CREATE TABLE "platform" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL UNIQUE
);



ALTER TABLE "movie" ADD CONSTRAINT "movie_fk0" FOREIGN KEY ("platformId") REFERENCES "platform"("id");
ALTER TABLE "movie" ADD CONSTRAINT "movie_fk1" FOREIGN KEY ("genreId") REFERENCES "genre"("id");
