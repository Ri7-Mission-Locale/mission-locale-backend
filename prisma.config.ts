import { defineConfig, env } from "prisma/config";
import "dotenv/config";

export default defineConfig({
  schema: "prisma/models",
  datasource: { url: env("DATABASE_URL") },
});
