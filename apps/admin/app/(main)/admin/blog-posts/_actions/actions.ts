"use server";

import { revalidatePath } from "next/cache";
import { eq, desc, asc } from "@workspace/database";
import {
  BlogPostUpdate,
  createBlogPostSchema,
  NewBlogPost,
  updateBlogPostSchema,
} from "@/validators/blog";
import { BlogPost, blogPosts, db } from "@workspace/database";
import { currentUser } from "@/lib/auth";

// Server action to create a blog post
export async function createBlogPost(data: NewBlogPost) {
  try {
    // Validate the data
    const validatedData = createBlogPostSchema.parse(data);
    const user = await currentUser();

    if (user?.id) {
      // Prepare the data for insertion
      const newPost = {
        title: validatedData.title,
        slug: validatedData.slug,
        content: validatedData.content,
        excerpt: validatedData.excerpt || null,
        coverImageUrl: validatedData.coverImageUrl || null,
        tags: validatedData.tags,
        status: validatedData.status,
        createdAt: new Date(),
        updatedAt: new Date(),
        publishedAt: validatedData.status === "PUBLISHED" ? new Date() : null,
        authorId: user?.id,
      };
      // Insert the new blog post
      const result = await db
        .insert(blogPosts)
        .values(newPost)
        .returning({ id: blogPosts.id });

      // Revalidate the blog posts page to show the new post
      revalidatePath("/admin/blog-posts");

      return { success: true, id: result[0]?.id };
    }
  } catch (error) {
    console.error("Error creating blog post:", error);
    throw error;
  }
}
export async function deleteBlogPost(id: string) {
  try {
    const result = await db
      .delete(blogPosts)
      .where(eq(blogPosts.id, id))
      .returning({ id: blogPosts.id });

    // Revalidate the blog posts page to show the new post
    revalidatePath("/admin/blog-posts");

    return { success: true, id: result[0]?.id };
  } catch (error) {
    console.error("Error creating blog post:", error);
    throw error;
  }
}

// Server action to update a blog post
export async function updateBlogPost(id: string, data: BlogPostUpdate) {
  try {
    // Validate the data
    const validatedData = updateBlogPostSchema.parse(data);

    // Prepare the data for update
    const updateData: any = {
      updatedAt: new Date(),
    };

    // Only include fields that are provided
    if (validatedData.title !== undefined)
      updateData.title = validatedData.title;
    if (validatedData.slug !== undefined) updateData.slug = validatedData.slug;
    if (validatedData.content !== undefined)
      updateData.content = validatedData.content;
    if (validatedData.excerpt !== undefined)
      updateData.excerpt = validatedData.excerpt;
    if (validatedData.coverImageUrl !== undefined)
      updateData.coverImageUrl = validatedData.coverImageUrl;
    if (validatedData.tags !== undefined) updateData.tags = validatedData.tags;

    // Handle status change
    if (validatedData.status !== undefined) {
      updateData.status = validatedData.status;

      // If status is changing to PUBLISHED and it wasn't before, set publishedAt
      if (validatedData.status === "PUBLISHED") {
        const currentPost = await db
          .select({ status: blogPosts.status })
          .from(blogPosts)
          .where(eq(blogPosts.id, id))
          .limit(1);

        if (
          currentPost.length > 0 &&
          currentPost?.[0]?.status !== "PUBLISHED"
        ) {
          updateData.publishedAt = new Date();
        }
      }
    }

    // Update the blog post
    await db.update(blogPosts).set(updateData).where(eq(blogPosts.id, id));

    // Revalidate the blog post page to show the updated content
    revalidatePath("/admin/blog-posts");
  } catch (error) {
    console.error("Error updating blog post:", error);
    throw error;
  }
}

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
      with: { author: true },
    });

    return result;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw error;
  }
}
