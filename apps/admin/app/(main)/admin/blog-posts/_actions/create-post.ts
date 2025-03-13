"use server";

import { currentUser } from "@/lib/auth";
import { NewBlogPost } from "@/validators/blog";
import { blogPosts, db } from "@workspace/database";

export const createBlogPost = async (values: NewBlogPost) => {
  console.log("Creating new post:", values);
  const user = await currentUser();
  try {
    if (user?.id) {
      await db.insert(blogPosts).values({ ...values, authorId: user?.id });
    }
  } catch (error) {
    console.log(error);
  }
};
