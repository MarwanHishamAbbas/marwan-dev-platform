"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { Button } from "@workspace/ui/components/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import {
  type blogPostBaseSchema,
  BlogPostUpdate,
  createBlogPostSchema,
  NewBlogPost,
  updateBlogPostSchema,
} from "@/validators/blog";
import { Card, CardContent, CardFooter } from "@workspace/ui/components/card";

import { Loader2 } from "lucide-react";
import { TagInput } from "../../../../../components/ui/tag-input";
import { useRouter } from "next/navigation";
import { MarkdownInput } from "../../../../../components/ui/markdown-input";
import MarkdownEditor from "@/components/ui/rich-text";

interface BlogPostFormProps {
  type: "create" | "update";
  defaultValues?: z.infer<typeof blogPostBaseSchema> & {
    slug?: string;
  };
  isSubmitting?: boolean;
}

// Add conditional types for the onSubmit prop
interface CreateBlogPostFormProps extends BlogPostFormProps {
  type: "create";
  onSubmit: (values: NewBlogPost) => void;
}

interface UpdateBlogPostFormProps extends BlogPostFormProps {
  type: "update";
  onSubmit: (values: BlogPostUpdate) => void;
}

// Union type for the component props
type Props = CreateBlogPostFormProps | UpdateBlogPostFormProps;

export function BlogPostForm(props: Props) {
  const { type, defaultValues, isSubmitting = false } = props;

  // Select the appropriate schema based on form type
  const formSchema =
    type === "create" ? createBlogPostSchema : updateBlogPostSchema;

  // Initialize form with the selected schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: defaultValues?.title || "",
      content: defaultValues?.content || "",
      excerpt: defaultValues?.excerpt || "",
      coverImageUrl: defaultValues?.coverImageUrl || "",
      tags: defaultValues?.tags || [],
      status: defaultValues?.status || "DRAFT",
      ...(type === "create" && {
        slug: defaultValues?.slug || "",
      }),
      ...(type === "update" &&
        defaultValues?.slug && {
          slug: defaultValues.slug,
        }),
    },
  });

  const router = useRouter();

  // Handle form submission with proper type handling
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    props.onSubmit(values as any);
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title Field */}

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter blog post title" {...field} />
                  </FormControl>
                  <FormDescription>
                    The title of your blog post (3-100 characters)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Slug Field */}
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="enter-your-slug" {...field} />
                  </FormControl>
                  <FormDescription>
                    URL-friendly version of the title (lowercase, hyphens)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Excerpt Field */}
            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Brief summary of your post"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A short summary (max 200 characters)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Cover Image URL Field */}
            <FormField
              control={form.control}
              name="coverImageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription>
                    URL to the cover image for your blog post
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Tags Field - Using our custom Tag Input */}
            <FormField
              control={form.control}
              name={"tags"}
              render={({ field }) => (
                <FormItem>
                  {<FormLabel>Tags</FormLabel>}
                  <FormControl>
                    <TagInput
                      value={field.value || []}
                      onChange={field.onChange}
                      placeholder="Add a tag..."
                      maxTags={6}
                      onBlur={field.onBlur}
                    />
                  </FormControl>
                  <FormDescription>
                    Add tags to categorize your post (press Enter to add)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Status Field */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select post status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="DRAFT">Draft</SelectItem>
                      <SelectItem value="PUBLISHED">Published</SelectItem>
                      <SelectItem value="ARCHIVED">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Current status of the blog post
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="flex flex-col col-span-2">
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <MarkdownEditor
                      className="h-full"
                      value={field.value || ""}
                      onChange={field.onChange}
                      placeholder="Start writing your blog post..."
                      onBlur={field.onBlur}
                    />
                  </FormControl>
                  <FormDescription>
                    Write your blog post content in markdown
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end space-x-2 mt-4">
            <Button
              onClick={() => router.back()}
              variant="outline"
              type="button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                isSubmitting || (type === "update" && !form.formState.isDirty)
              }
            >
              {isSubmitting && <Loader2 className="size-4 animate-spin" />}
              {type === "create" ? "Create Post" : "Update Post"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
