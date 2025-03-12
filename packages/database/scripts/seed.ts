import dotenv from "dotenv";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { users } from "@/schema";

// Load environment variables from .env file
dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("ERROR: DATABASE_URL environment variable is not set.");
  console.error(
    "Make sure you have a .env file with DATABASE_URL or set the environment variable."
  );
  process.exit(1);
}

console.log(`Connecting to database: ${connectionString.split("@")[1]}`); // Log only the host part, not credentials

async function seed() {
  // Create a new connection just for seeding
  const client = postgres(connectionString!, {
    prepare: false,
    connect_timeout: 10, // Add connection timeout
  });

  // Create drizzle instance
  const db = drizzle(client);

  try {
    // Validate connection before proceeding
    console.log("Validating database connection...");
    await client`SELECT 1`; // Simple query to test connection
    console.log("Connection successful");

    console.log("Seeding Supabase database...");

    // Insert sample users
    const insertedUsers = await db
      .insert(users)
      .values([
        {
          fullName: "John Doe",
          phone: "555-123-4567",
        },
        {
          fullName: "Jane Smith",
          phone: "555-987-6543",
        },
        {
          fullName: "Alex Johnson",
          phone: "555-555-5555",
        },
        {
          fullName: "Maria Garcia",
          phone: "555-111-2222",
        },
        {
          fullName: "David Kim",
          phone: "555-333-4444",
        },
      ])
      .returning();

    console.log(`Inserted ${insertedUsers.length} users successfully`);
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  } finally {
    // Close the connection when done
    console.log("Closing database connection...");
    await client.end();
  }
}

// Run the seed function
seed()
  .then(() => {
    console.log("Seed completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
