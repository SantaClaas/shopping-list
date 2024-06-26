import type { Config } from "drizzle-kit";

export default {
  schema: "./src/data/schema.ts",
  out: "./src/data/migrations",
  driver: "expo",
} satisfies Config;
