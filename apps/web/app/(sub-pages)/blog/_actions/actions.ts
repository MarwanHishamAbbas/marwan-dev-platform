"use server";

import { eq, desc } from "@workspace/database";

import { BlogPost, blogPosts, db } from "@workspace/database";

export async function getBlogPost(
  slug: string
): Promise<Partial<BlogPost> | null> {
  try {
    const result = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);

    if (result.length === 0) {
      return null;
    }

    return { ...result[0] };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    throw error;
  }
}

export async function getAllBlogPosts() {
  try {
    const result = await db.query.blogPosts.findMany({
      orderBy: [desc(blogPosts.createdAt)],
      where: eq(blogPosts.status, "PUBLISHED"),
    });

    return result;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw error;
  }
}
