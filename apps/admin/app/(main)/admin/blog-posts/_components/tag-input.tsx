"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";
import { Badge } from "@workspace/ui/components/badge";

export type TagInputProps = {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  maxTags?: number;
  className?: string;
  onBlur?: () => void;
};

export function TagInput({
  value = [],
  onChange,
  placeholder = "Add tag...",
  disabled = false,
  maxTags,
  className,
  onBlur,
  ...props
}: TagInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = React.useState("");
  const tags = value || [];

  const handleRemoveTag = React.useCallback(
    (index: number) => {
      const newTags = [...tags];
      newTags.splice(index, 1);
      onChange(newTags);
    },
    [tags, onChange]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && inputValue) {
        e.preventDefault();

        const trimmedValue = inputValue.trim();
        if (!trimmedValue) return;

        // Check if tag already exists
        if (tags.includes(trimmedValue)) return;

        // Check if we've reached the maximum number of tags
        if (maxTags !== undefined && tags.length >= maxTags) return;

        onChange([...tags, trimmedValue]);
        setInputValue("");
      }

      if (e.key === "Backspace" && !inputValue && tags.length > 0) {
        handleRemoveTag(tags.length - 1);
      }
    },
    [inputValue, tags, onChange, handleRemoveTag, maxTags]
  );

  const handleBlur = React.useCallback(() => {
    if (inputValue.trim()) {
      const trimmedValue = inputValue.trim();
      if (!tags.includes(trimmedValue)) {
        if (maxTags === undefined || tags.length < maxTags) {
          onChange([...tags, trimmedValue]);
        }
      }
      setInputValue("");
    }
    onBlur?.();
  }, [inputValue, tags, onChange, maxTags, onBlur]);

  return (
    <div
      className={cn(
        "flex flex-wrap gap-1.5 rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        className
      )}
      onClick={() => {
        inputRef.current?.focus();
      }}
    >
      {tags.map((tag, index) => (
        <Badge key={index} variant="secondary" className="rounded-sm">
          {tag}
          {!disabled && (
            <button
              type="button"
              className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onClick={() => handleRemoveTag(index)}
            >
              <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </Badge>
      ))}
      <input
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder={tags.length === 0 ? placeholder : undefined}
        disabled={disabled}
        className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground min-w-[120px]"
        {...props}
      />
    </div>
  );
}
