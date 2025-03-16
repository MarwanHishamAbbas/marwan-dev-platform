import Navbar from "@/components/layout/Navbar";
import { FC } from "react";
import BlogCard from "@/components/blogs/blog-card";
import Link from "next/link";
import { buttonVariants } from "@workspace/ui/components/button";
import { getAllBlogPosts } from "./_actions/actions";

type PageProps = {};

const Page: FC<PageProps> = async ({}) => {
  const posts = await getAllBlogPosts();
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
            isCurrentPage: true,
          },
        ]}
      />
      <Link
        href="/admin/blog-posts/create"
        className={buttonVariants({ className: "w-fit mb-4" })}
      >
        Create Post
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {posts.map((post) => (
          <BlogCard post={post} key={post.id} />
        ))}
      </div>
    </>
  );
};

export default Page;
