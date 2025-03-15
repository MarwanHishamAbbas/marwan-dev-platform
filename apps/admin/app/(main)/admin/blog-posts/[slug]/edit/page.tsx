import { getBlogPost, updateBlogPost } from "../../_actions/actions";
import { BlogPostEditor } from "../../_components/blog-post-editor";

export default async function BlogPostPage() {
  // Fetch an existing post for editing
  const existingPost = await getBlogPost("new-blog-post");

  return (
    <div className="container py-10 space-y-16">
      {existingPost && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Edit Existing Blog Post</h2>
          <BlogPostEditor
            type="update"
            defaultValues={existingPost}
            updateAction={updateBlogPost}
          />
        </section>
      )}
    </div>
  );
}
