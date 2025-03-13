import { relations } from "drizzle-orm";
import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  pgEnum,
  uuid,
} from "drizzle-orm/pg-core";

export const ROLE = pgEnum("role", ["BASIC", "ADMIN"]);

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  role: ROLE().default("BASIC").notNull(),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    provider: text("provider").notNull(),
    type: text("type").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ]
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => [
    {
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    },
  ]
);

// Blog posts table
export const blogPosts = pgTable("blog_post", {
  id: uuid("id").primaryKey().defaultRandom(),

  // Author - linked to user
  authorId: text("author_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  // Blog content
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(), // URL-friendly version of the title
  content: text("content").notNull(), // For markdown content
  excerpt: text("excerpt"), // Optional short description

  // Media
  coverImageUrl: text("cover_image_url"),

  // Tags - Postgres supports arrays
  tags: text("tags").array(), // Array of strings for tags

  // Status
  status: text("status").notNull().default("DRAFT"),

  // Timestamps
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  publishedAt: timestamp("published_at", { mode: "date" }),
});

export const usersRelations = relations(users, ({ many }) => ({
  blogPost: many(blogPosts),
}));

export const postsRelations = relations(blogPosts, ({ one }) => ({
  author: one(users, { fields: [blogPosts.authorId], references: [users.id] }),
}));

export type NewBlogPost = typeof blogPosts.$inferInsert;
export type BlogPost = typeof blogPosts.$inferSelect;
