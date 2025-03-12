import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const getEnvVariable = (name: string) => {
  const value = process.env[name];
  if (value == null) throw new Error(`environment variable ${name} not found`);
  return value;
};

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
  dbCredentials: {
    url: getEnvVariable("DATABASE_URL"),
  },
});
