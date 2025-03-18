"use client";

import { useTransition, type FC } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";

import { formatDistanceToNow } from "date-fns";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";
import { Edit, Loader2, Trash } from "lucide-react";
import { BlogPost } from "@workspace/database";
import Image from "next/image";
import { Badge } from "@workspace/ui/components/badge";
import { User } from "next-auth";
import { deleteBlogPost } from "@/app/(main)/admin/blog-posts/_actions/actions";

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "PUBLISHED":
      return (
        <Badge className="bg-green-500 hover:bg-green-600">Published</Badge>
      );
    case "DRAFT":
      return (
        <Badge variant="outline" className="text-muted-foreground">
          Draft
        </Badge>
      );
    case "ARCHIVED":
      return <Badge variant="secondary">Archived</Badge>;
    default:
      return null;
  }
};

type BlogCardProps = {
  post: BlogPost & { author: User };
};

const BlogCard: FC<BlogCardProps> = ({ post }) => {
  const [isDeleting, deleteTransition] = useTransition();

  return (
    <Card key={post.id} className="flex flex-col h-full pb-2 pt-0">
      <Link
        href={`${process.env.NEXT_PUBLIC_PORTFOLIO_URL}/blog/${post.slug}`}
        target="_blank"
      >
        {post.coverImageUrl && (
          <div className="relative w-full h-60 overflow-hidden rounded-t-lg">
            <Image
              fill
              src={post.coverImageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2">
              <StatusBadge status={post.status} />
            </div>
          </div>
        )}
      </Link>

      <CardHeader>
        {!post.coverImageUrl && (
          <div className="flex justify-end mb-2">
            <StatusBadge status={post.status} />
          </div>
        )}
        <CardTitle className="line-clamp-2">{post.title}</CardTitle>
        <CardDescription className="flex items-center gap-2 ">
          <Avatar className="h-6 w-6">
            <AvatarImage src={post.author.image || undefined} />
            <AvatarFallback>
              {post.author.name?.substring(0, 2).toUpperCase() || "??"}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs">{post.author.name}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow ">
        {post.excerpt && (
          <p className="text-muted-foreground line-clamp-3 text-sm">
            {post.excerpt}
          </p>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{post.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <span className="text-xs text-muted-foreground">
          <p className="text-xs dark:text-white/30 text-black/30">
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
        </span>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="ghost">
            <Link href={`/admin/blog-posts/${post.slug}/edit`}>
              <Edit className="h-4 w-4 mr-1" /> Edit
            </Link>
          </Button>
          <Button
            size="sm"
            variant="ghost"
            disabled={isDeleting}
            onClick={() =>
              deleteTransition(async () => {
                await deleteBlogPost(post.id);
              })
            }
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            ) : (
              <Trash className="h-4 w-4 mr-1" />
            )}{" "}
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
