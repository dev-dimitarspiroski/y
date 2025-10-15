import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: [
    "./src/db/schemas/tweet.schema.ts", // Schema for tweets table
    "./src/db/schemas/user.schema.ts", // Schema for users table
    "./src/db/schemas/users_follows.schema.ts", // Schema for users follows
    "./src/db/schemas/user_liked_tweets.ts", //Schema for users likes
  ],
  out: "",
  dialect: "postgresql",
  dbCredentials: {
    host: process.env.POSTGRES_HOST!,
    user: process.env.POSTGRES_USER!,
    password: process.env.POSTGRES_PASSWORD!,
    database: process.env.POSTGRES_DATABASE!,
    port: Number(process.env.POSTGRES_PORT!),
    ssl: true,
  },
  verbose: true,
});
