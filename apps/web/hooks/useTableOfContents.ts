// hooks/useTableOfContents.ts
import { useState, useEffect } from "react";

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

export function useTableOfContents(htmlContent: string) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [processedContent, setProcessedContent] = useState<string>(htmlContent);

  useEffect(() => {
    if (typeof window === "undefined" || !htmlContent) return;

    // Process the content to ensure all headings have IDs
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;

    const headingElements = tempDiv.querySelectorAll("h1, h2, h3");
    const extractedHeadings: TocItem[] = [];

    headingElements.forEach((heading) => {
      const tagName = heading.tagName.toLowerCase();
      const level = parseInt(tagName.charAt(1));
      const rawText = heading.textContent || "";
      const text = removeEmojis(rawText);

      // Use existing id if available, otherwise generate one
      if (!heading.id) {
        const id = removeEmojis(rawText)
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");
        heading.id = id;
      }

      extractedHeadings.push({
        id: heading.id,
        text,
        level,
      });
    });

    setHeadings(extractedHeadings);
    setProcessedContent(tempDiv.innerHTML);
  }, [htmlContent]);

  return { headings, processedContent };
}
