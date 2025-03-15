import Navbar from "@/components/layout/Navbar";
import { getBlogPost, updateBlogPost } from "../../_actions/actions";
import { BlogPostEditor } from "../../_components/blog-post-editor";

type PageProps = {
  params: Promise<{ slug: string }>;
};

import { type FC } from "react";

const BlogPostPage: FC<PageProps> = async ({ params }) => {
  const { slug } = await params;
  const existingPost = await getBlogPost(slug);

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
            label: "Update Post",
            isCurrentPage: true,
          },
        ]}
      />
      <div className="px-4">
        {existingPost && (
          <section>
            <BlogPostEditor
              type="update"
              defaultValues={existingPost}
              // This allows the client component to call the server action
              updateAction={updateBlogPost}
            />
          </section>
        )}
      </div>
    </>
  );
};

export default BlogPostPage;
