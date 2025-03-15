"use client";

import { BlogPostUpdate, NewBlogPost } from "@/validators/blog";

import { useState } from "react";
import { BlogPostForm } from "./blog-post-form";

interface CreateBlogPostEditorProps {
  type: "create";
  createAction: (data: NewBlogPost) => Promise<any>;
}

interface UpdateBlogPostEditorProps {
  type: "update";
  defaultValues: any;
  updateAction: (id: string, data: BlogPostUpdate) => Promise<any>;
}

type BlogPostEditorProps =
  | CreateBlogPostEditorProps
  | UpdateBlogPostEditorProps;

export function BlogPostEditor(props: BlogPostEditorProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleCreateSubmit = async (data: NewBlogPost) => {
    if (props.type !== "create") return;

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      await props.createAction(data);
      setSuccess("Blog post created successfully!");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create blog post"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateSubmit = async (data: BlogPostUpdate) => {
    if (props.type !== "update") return;

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      await props.updateAction(props.defaultValues.id, data);
      setSuccess("Blog post updated successfully!");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update blog post"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-50 text-green-600 rounded-md">
          {success}
        </div>
      )}

      {props.type === "create" ? (
        <BlogPostForm
          type="create"
          onSubmit={handleCreateSubmit}
          isSubmitting={isSubmitting}
        />
      ) : (
        <BlogPostForm
          type="update"
          defaultValues={props.defaultValues}
          onSubmit={handleUpdateSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
