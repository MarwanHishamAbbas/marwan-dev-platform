"use client";

import { BlogPostUpdate, NewBlogPost } from "@/validators/blog";

import { useTransition } from "react";
import { BlogPostForm } from "./blog-post-form";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const [isSubmitting, startTransition] = useTransition();

  const handleCreateSubmit = async (data: NewBlogPost) => {
    if (props.type !== "create") return;

    try {
      startTransition(async () => {
        await props.createAction(data).then(() => {
          router.push("/admin/blog-posts");
        });
      });
    } catch (err) {
    } finally {
    }
  };

  const handleUpdateSubmit = async (data: BlogPostUpdate) => {
    if (props.type !== "update") return;

    try {
      startTransition(async () => {
        await props.updateAction(props.defaultValues.id, data).then(() => {
          router.push("/admin/blog-posts");
        });
      });
    } catch (err) {
    } finally {
    }
  };

  return (
    <div>
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
