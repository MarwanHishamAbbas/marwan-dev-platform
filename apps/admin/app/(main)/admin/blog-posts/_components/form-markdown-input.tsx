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
import { MarkdownInput } from "./markdown-input";

interface FormMarkdownInputProps {
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function FormMarkdownInput({
  name,
  label,
  description,
  placeholder,
  disabled,
}: FormMarkdownInputProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <MarkdownInput
              value={field.value || ""}
              onChange={field.onChange}
              placeholder={placeholder}
              disabled={disabled}
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
