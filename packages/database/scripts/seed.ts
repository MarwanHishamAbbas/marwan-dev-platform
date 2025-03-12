import { v4 as uuidv4 } from "uuid";
import { user, post, category, postCategory } from "@/schema"; // Adjust import path as needed
import { db } from "@/database";

// This function accepts a db instance that you've already configured
export async function seedDatabase(db: any) {
  console.log("🌱 Starting database seeding...");

  try {
    // Clear existing data (optional)
    console.log("Clearing existing data...");
    await db.delete(postCategory);
    await db.delete(post);
    await db.delete(category);
    await db.delete(user);

    // Create users
    console.log("Creating users...");
    const userIds = [];

    const users = [
      {
        fullName: "John Doe",
        email: "john@example.com",
        phone: "555-1234",
        address: "123 Main St",
      },
      {
        fullName: "Jane Smith",
        email: "jane@example.com",
        phone: "555-5678",
        address: "456 Elm St",
      },
      {
        fullName: "Bob Johnson",
        email: "bob@example.com",
        phone: "555-9012",
        address: "789 Oak St",
      },
    ];

    for (const userData of users) {
      const userId = uuidv4();
      userIds.push(userId);

      await db.insert(user).values({
        id: userId,
        ...userData,
      });
    }

    // Create categories
    console.log("Creating categories...");
    const categoryIds = [];

    const categories = [
      { title: "Technology" },
      { title: "Travel" },
      { title: "Food" },
      { title: "Health" },
      { title: "Education" },
    ];

    for (const categoryData of categories) {
      const categoryId = uuidv4();
      categoryIds.push(categoryId);

      await db.insert(category).values({
        id: categoryId,
        ...categoryData,
      });
    }

    // Create posts
    console.log("Creating posts...");
    const postIds = [];

    const posts = [
      {
        slug: "getting-started-with-drizzle",
        title: "Getting Started with Drizzle ORM",
        authorId: userIds[0],
      },
      {
        slug: "best-travel-destinations-2025",
        title: "Best Travel Destinations for 2025",
        authorId: userIds[1],
      },
      {
        slug: "healthy-breakfast-recipes",
        title: "10 Healthy Breakfast Recipes",
        authorId: userIds[2],
      },
      {
        slug: "typescript-best-practices",
        title: "TypeScript Best Practices in 2025",
        authorId: userIds[0],
      },
      {
        slug: "learning-new-languages",
        title: "Tips for Learning New Languages",
        authorId: userIds[1],
      },
    ];

    for (const postData of posts) {
      const postId = uuidv4();
      postIds.push(postId);

      await db.insert(post).values({
        id: postId,
        ...postData,
      });
    }

    // Create post-category relationships
    console.log("Creating post-category relationships...");

    const postCategoryRelations = [
      { postId: postIds[0], categoryId: categoryIds[0] },
      { postId: postIds[0], categoryId: categoryIds[4] },
      { postId: postIds[1], categoryId: categoryIds[1] },
      { postId: postIds[2], categoryId: categoryIds[2] },
      { postId: postIds[2], categoryId: categoryIds[3] },
      { postId: postIds[3], categoryId: categoryIds[0] },
      { postId: postIds[3], categoryId: categoryIds[4] },
      { postId: postIds[4], categoryId: categoryIds[4] },
    ];

    for (const relation of postCategoryRelations) {
      await db.insert(postCategory).values(relation);
    }

    console.log("✅ Seeding completed successfully!");
    return { userIds, categoryIds, postIds };
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

seedDatabase(db).catch(console.error);
