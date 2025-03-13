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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { FormTagInput } from "./form-tag-input";
import { FormMarkdownInput } from "./form-markdown-input";

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

  // Handle form submission with proper type handling
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    props.onSubmit(values as any);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>
          {type === "create" ? "Create New Blog Post" : "Edit Blog Post"}
        </CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-6">
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

            {/* Content Field - Using our custom Markdown Input */}
            <FormMarkdownInput
              name="content"
              label="Content"
              description="Write your blog post content in markdown"
              placeholder="Start writing your blog post..."
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
            <FormTagInput
              name="tags"
              label="Tags"
              description="Add tags to categorize your post (press Enter to add)"
              placeholder="Add a tag..."
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
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Saving..."
                : type === "create"
                  ? "Create Post"
                  : "Update Post"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
