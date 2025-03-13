"use client";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { TagInput } from "./tag-input";

interface FormTagInputProps {
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  maxTags?: number;
}

export function FormTagInput({
  name,
  label,
  description,
  placeholder,
  disabled,
  maxTags,
}: FormTagInputProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <TagInput
              value={field.value || []}
              onChange={field.onChange}
              placeholder={placeholder}
              disabled={disabled}
              maxTags={maxTags}
              onBlur={field.onBlur}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
