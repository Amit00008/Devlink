import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./db/schema.js",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL,
  }
});