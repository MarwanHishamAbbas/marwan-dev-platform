import Navbar from "@/components/layout/Navbar";
import { createBlogPost } from "../_actions/actions";
import { BlogPostEditor } from "../_components/blog-post-editor";

export default async function BlogPostPage() {
  return (
    <>
      <Navbar
        items={[
          {
            label: "Admin",
            href: "/admin",
          },
          {
            label: "Blog Posts",
            href: "/admin/blog-posts",
          },
          {
            label: "Create Post",
            isCurrentPage: true,
          },
        ]}
      />
      <BlogPostEditor type="create" createAction={createBlogPost} />
    </>
  );
}
