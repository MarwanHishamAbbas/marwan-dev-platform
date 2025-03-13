"use client";

import { createBlogPost } from "../_actions/create-post";
import { BlogPostForm } from "../_components/blog-post-form";
import { BlogPostUpdate, NewBlogPost } from "@/validators/blog";

export default function Home() {
  // Example handler for form submission
  const handleCreateSubmit = async (data: NewBlogPost) => {
    await createBlogPost(data);
  };

  const handleUpdateSubmit = (data: BlogPostUpdate) => {
    console.log("Updating post:", data);
    // Here you would typically call your API to update the post
  };

  // Example default values for update form
  const existingPost = {
    title: "Example Blog Post",
    content: "# This is an example\n\nThis is a markdown content example.",
    excerpt: "A brief summary of the post",
    coverImageUrl: "https://example.com/image.jpg",
    tags: ["react", "nextjs", "typescript"],
    status: "DRAFT" as const,
    slug: "example-blog-post",
  };

  return (
    <div className="container py-10 space-y-16">
      <section>
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create New Blog Post
        </h2>
        <BlogPostForm type="create" onSubmit={handleCreateSubmit} />
      </section>

      {/* <section>
        <h2 className="text-2xl font-bold mb-6">Edit Existing Blog Post</h2>
        <BlogPostForm type="update" defaultValues={existingPost} onSubmit={handleUpdateSubmit} />
      </section> */}
    </div>
  );
}
