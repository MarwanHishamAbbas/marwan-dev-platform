"use client";

import { useEffect, useState, type FC } from "react";
import { addIdsToHeadings, MDXTableOfContents } from "./mdx-toc";

type BlogContentProps = {
  content: string;
};

const BlogContent: FC<BlogContentProps> = ({ content }) => {
  const [processedContent, setProcessedContent] = useState<string>("");

  useEffect(() => {
    async function loadContent() {
      // Get your HTML content from wherever you store it

      // Process the content to add IDs to headings
      const processed = addIdsToHeadings(content);
      setProcessedContent(processed);
    }

    loadContent();
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
      <div className="md:col-span-3">
        <article
          className="prose "
          dangerouslySetInnerHTML={{ __html: processedContent }}
        />
      </div>
      <div className="hidden md:block">
        <div className="sticky top-20">
          <MDXTableOfContents content={content} />
        </div>
      </div>
    </div>
  );
};

export default BlogContent;
