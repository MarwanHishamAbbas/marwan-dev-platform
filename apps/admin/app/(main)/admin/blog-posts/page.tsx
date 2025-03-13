import { db } from "@workspace/database";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Badge } from "@workspace/ui/components/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { type FC } from "react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";
import { Eye } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

type PageProps = {};

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

      <div className="grid grid-cols-3 gap-6 px-4">
        {posts.map((post) => (
          <Card key={post.id} className="flex flex-col h-full pt-0">
            {post.coverImageUrl && (
              <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                <img
                  src={post.coverImageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <StatusBadge status={post.status} />
                </div>
              </div>
            )}

            <CardHeader className={!post.coverImageUrl ? "pb-2" : "pb-2 pt-6"}>
              {!post.coverImageUrl && (
                <div className="flex justify-end mb-2">
                  <StatusBadge status={post.status} />
                </div>
              )}
              <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={post.author.image || undefined} />
                  <AvatarFallback>
                    {post.author.name?.substring(0, 2).toUpperCase() || "??"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{post.author.name}</span>
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-grow pb-2">
              {post.excerpt && (
                <p className="text-muted-foreground line-clamp-3">
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

            <CardFooter className="pt-2 flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                {post.publishedAt
                  ? `Published ${formatDistanceToNow(
                      new Date(post.publishedAt),
                      {
                        addSuffix: true,
                      }
                    )}`
                  : `Updated ${formatDistanceToNow(new Date(post.updatedAt), {
                      addSuffix: true,
                    })}`}
              </span>

              <div className="flex items-center gap-2">
                <Button asChild size="sm" variant="ghost">
                  <Link href={`/blog/admin/${post.slug}`}>
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Page;
