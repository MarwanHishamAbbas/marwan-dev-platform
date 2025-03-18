import Slicer from "@/components/layout/Slicer";
import Wrapper from "@/components/layout/Wrapper";
import BlogHeader from "@/components/pages/blog/blog-header";
import { type FC } from "react";
import { getBlogPost } from "../_actions/actions";

import BlogContent from "@/components/pages/blog/blog-content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const Page: FC<PageProps> = async ({ params }) => {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  return (
    <>
      <Wrapper>
        <Slicer>
          <BlogHeader
            title={post?.title}
            overview={post?.excerpt}
            publishedAt={post?.publishedAt}
            updatedAt={post?.updatedAt}
            tag={post?.tags ?? []}
            coverImageUrl={post?.coverImageUrl ?? ""}
          />
          <BlogContent content={post?.content as string} />
        </Slicer>
      </Wrapper>
    </>
  );
};

export default Page;
