"use client";

import { cn } from "@workspace/ui/lib/utils";
import React, { useEffect, useState } from "react";

// Types for TOC items
type TocItem = {
  id: string;
  text: string;
  level: number;
};

// Function to remove emojis from text
function removeEmojis(text: string): string {
  return text
    .replace(
      /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu,
      ""
    )
    .trim();
}

// Function to extract headings from HTML content
export function extractHeadings(htmlContent: string): TocItem[] {
  const headings: TocItem[] = [];

  // Create a temporary DOM element to parse the HTML
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlContent;

  // Find all heading elements
  const headingElements = tempDiv.querySelectorAll("h1, h2, h3");

  headingElements.forEach((heading) => {
    const tagName = heading.tagName.toLowerCase();
    const level = parseInt(tagName.charAt(1));
    const rawText = heading.textContent || "";
    const text = removeEmojis(rawText);

    // Use existing id if available, otherwise generate one
    let id = heading.id;
    if (!id) {
      id = removeEmojis(rawText)
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
    }

    headings.push({ id, text, level });
  });

  return headings;
}

// Function to add IDs to headings in HTML content if they don't have one
export function addIdsToHeadings(htmlContent: string): string {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlContent;

  const headingElements = tempDiv.querySelectorAll("h1, h2, h3");

  headingElements.forEach((heading) => {
    if (!heading.id) {
      const text = heading.textContent || "";
      const cleanText = removeEmojis(text);
      const id = cleanText
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

      heading.id = id;
    }
  });

  return tempDiv.innerHTML;
}

interface TableOfContentsProps {
  headings: TocItem[];
  className?: string;
}

export function TableOfContents({ headings, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -80% 0px" }
    );

    // Observe all heading elements
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Update URL with hash
      window.history.pushState({}, "", `#${id}`);

      // Smooth scroll to element
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <h3 className="text-lg font-medium mb-4 glowing">Table of Contents</h3>
      <nav className="space-y-1">
        {headings.map((heading) => (
          <div
            key={heading.id}
            className={cn(
              "cursor-pointer transition-colors text-sm",
              heading.level === 1 && "pl-0",
              heading.level === 2 && "pl-2",
              heading.level === 3 && "pl-4",
              activeId === heading.id
                ? "font-medium text-primary"
                : "text-muted-foreground hover:text-primary"
            )}
            onClick={() => handleClick(heading.id)}
          >
            {heading.text}
          </div>
        ))}
      </nav>
    </div>
  );
}

// This component handles both extraction and rendering for HTML content
export function MDXTableOfContents({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  const [processedContent, setProcessedContent] = useState<string>("");
  const [headings, setHeadings] = useState<TocItem[]>([]);

  useEffect(() => {
    // Add IDs to headings if they don't have one
    const contentWithIds = addIdsToHeadings(content);
    setProcessedContent(contentWithIds);

    // Extract headings
    const extractedHeadings = extractHeadings(contentWithIds);
    setHeadings(extractedHeadings);
  }, [content]);

  if (headings.length === 0) {
    return null;
  }

  return <TableOfContents headings={headings} className={className} />;
}
