"use client";

import { Textarea } from "@workspace/ui/components/textarea";
import { cn } from "@workspace/ui/lib/utils";
import type * as React from "react";

// Omit the standard onChange from TextareaHTMLAttributes and define our own
interface MarkdownInputProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
}

export function MarkdownInput({
  value,
  onChange,
  className,
  ...props
}: MarkdownInputProps) {
  // Convert our string onChange to the event-based onChange expected by Textarea
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <Textarea
      value={value}
      onChange={handleChange}
      className={cn("font-mono min-h-[150px]", className)}
      {...props}
    />
  );
}
