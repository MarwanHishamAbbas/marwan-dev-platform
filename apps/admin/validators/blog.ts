import { z } from "zod";

// Base schema with common fields
export const blogPostBaseSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  excerpt: z
    .string()
    .max(200, "Excerpt cannot exceed 200 characters")
    .optional(),
  coverImageUrl: z.string().url("Must be a valid URL").optional().nullable(),
  tags: z.array(z.string()).default([]).optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
});

// Schema for creating a new blog post
export const createBlogPostSchema = blogPostBaseSchema.extend({
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .max(100, "Slug cannot exceed 100 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain only lowercase letters, numbers, and hyphens"
    ),
});

// Schema for updating an existing blog post
export const updateBlogPostSchema = blogPostBaseSchema.partial().extend({
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .max(100, "Slug cannot exceed 100 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain only lowercase letters, numbers, and hyphens"
    )
    .optional(),
});

// Schema for the complete blog post (including auto-generated fields)
export const blogPostSchema = z.object({
  id: z.string().uuid(),
  authorId: z.string().uuid(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  excerpt: z.string().nullable().optional(),
  coverImageUrl: z.string().nullable().optional(),
  tags: z.array(z.string()).default([]),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
  createdAt: z.date(),
  updatedAt: z.date(),
  publishedAt: z.date().nullable().optional(),
});

// Type definitions based on the schemas
export type BlogPost = z.infer<typeof blogPostSchema>;
export type NewBlogPost = z.infer<typeof createBlogPostSchema>;
export type BlogPostUpdate = z.infer<typeof updateBlogPostSchema>;
