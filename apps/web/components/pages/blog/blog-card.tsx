import { BlogPost } from "@workspace/database";
import { formatDistanceToNow } from "date-fns";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";

const BlogCard: FC<BlogPost> = (post) => {
  return (
    <Link
      href={`/post-${post.slug}`}
      className="group cursor-pointer space-y-1.5"
    >
      <div className="top-seperator flex flex-col justify-between overflow-hidden rounded-2xl border border-white/30">
        <Image
          loading="eager"
          priority
          src={post.coverImageUrl ?? ""}
          width={500}
          height={500}
          alt="Image"
          className="w-full rounded-xl  min-h-52 object-cover"
        />
      </div>
      <p className="text-sm dark:text-white/80 text-black/80">
        {post.tags?.[0]}
      </p>
      <div className="flex items-center justify-between gap-2">
        <h3 className="line-clamp-2 basis-3/4 text-xl font-medium">
          {post.title}
        </h3>
        <ArrowUpRight size={20} />
      </div>
      <p className="line-clamp-2 dark:text-white/50 text-black/50">
        {post.excerpt}
      </p>
      <p className="text-sm dark:text-white/30 text-black/30">
        {post.updatedAt
          ? `Updated ${formatDistanceToNow(new Date(post.updatedAt), {
              addSuffix: true,
            })}`
          : `Published ${formatDistanceToNow(
              new Date(post.publishedAt as Date),
              {
                addSuffix: true,
              }
            )}`}
      </p>
    </Link>
  );
};

export default BlogCard;
