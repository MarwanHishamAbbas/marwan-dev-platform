"use client";

import { Button, buttonVariants } from "@workspace/ui/components/button";
import { formatDistanceToNow } from "date-fns";
import { Copy, CopyCheck, Facebook, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, type FC } from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";

interface BlogHeaderProps {
  coverImageUrl: string | undefined | null;
  title: string | undefined | null;
  overview: string | undefined | null;
  tag: string[] | undefined | null;
  publishedAt: Date | undefined | null;
  updatedAt: Date | undefined | null;
}

const BlogHeader: FC<BlogHeaderProps> = ({
  title,
  overview,
  publishedAt,
  tag,
  coverImageUrl,
  updatedAt,
}) => {
  const pathname = usePathname();
  const [copied, setCopyId] = useState<string>("");
  return (
    <header className="space-y-8">
      <div className="space-y-4">
        <div className="flex w-fit items-baseline gap-1 rounded-full dark:bg-white/5 bg-black/5 px-2 py-2 text-sm">
          <span className="rounded-full dark:bg-white/10 bg-black/10 px-2 py-1">
            {tag?.[0]}
          </span>

          <span className="px-2 py-1">8 min read</span>
        </div>
        <h1 className="text-3xl font-medium md:text-6xl glowing">{title}</h1>
        <p className="text-base dark:text-white/70 text-black/70 md:text-lg">
          {overview}
        </p>
      </div>
      <Image
        loading="eager"
        priority
        src={coverImageUrl ?? ""}
        width={500}
        height={500}
        alt={title ?? ""}
        className="w-full rounded-xl"
      />

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex justify-between gap-8">
          <div>
            <p className="dark:text-white/30 text-black/30">Written by</p>
            <h4 className="text-sm font-medium">Marwan Hisham</h4>
          </div>
          <div>
            <p className="dark:text-white/30 text-black/30">
              {updatedAt ? "Updated" : "Published"} on
            </p>
            <h4 className="text-sm font-medium">
              {updatedAt
                ? `${formatDistanceToNow(new Date(updatedAt), {
                    addSuffix: true,
                  })}`
                : ` ${formatDistanceToNow(new Date(publishedAt as Date), {
                    addSuffix: true,
                  })}`}
            </h4>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <Button
            variant={"outline"}
            onClick={async () => {
              if ("clipboard" in navigator) {
                await navigator.clipboard.writeText(
                  `https://www.marwanhisham.com${pathname}`
                );
              }
              setCopyId("write-text");
              setTimeout(() => {
                setCopyId("");
              }, 2000);
            }}
            className="gap-2 rounded-xl"
          >
            {copied === "write-text" ? (
              <>
                <CopyCheck size={18} />
                Copied
              </>
            ) : (
              <>
                <Copy size={18} />
                Copy Link
              </>
            )}
          </Button>
          <div className="space-x-2">
            <TwitterShareButton
              title={title ?? ""}
              url={`https://www.marwanhisham.com${pathname}`}
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  className: "rounded-xl",
                  variant: "outline",
                })}
              >
                <Twitter size={18} />
              </div>
            </TwitterShareButton>
            <LinkedinShareButton
              title={title ?? ""}
              source={`https://www.marwanhisham.com${pathname}`}
              url={`https://www.marwanhisham.com${pathname}`}
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  className: "rounded-xl",
                  variant: "outline",
                })}
              >
                <Linkedin size={18} />
              </div>
            </LinkedinShareButton>
            <FacebookShareButton
              title={title ?? ""}
              url={`https://www.marwanhisham.com${pathname}`}
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  className: "rounded-xl",
                  variant: "outline",
                })}
              >
                <Facebook size={18} />
              </div>
            </FacebookShareButton>
          </div>
        </div>
      </div>
    </header>
  );
};

export default BlogHeader;
