import { db } from "@workspace/database";

import { Badge } from "@workspace/ui/components/badge";
import Navbar from "@/components/layout/Navbar";

import { FC } from "react";
import BlogCard from "@/components/blogs/blog-card";
import Link from "next/link";
import { buttonVariants } from "@workspace/ui/components/button";

type PageProps = {};

const Page: FC<PageProps> = async ({}) => {
  const posts = await db.query.blogPosts.findMany({ with: { author: true } });
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

      <div className="grid grid-cols-4 gap-6">
        {posts.map((post) => (
          <BlogCard post={post} key={post.id} />
        ))}
      </div>
    </>
  );
};

export default Page;
