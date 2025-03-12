import {
  index,
  pgTable,
  primaryKey,
  serial,
  text,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const user = pgTable(
  "user",
  {
    id: uuid().primaryKey().defaultRandom(),

    fullName: text("full_name"),
    email: varchar("email").notNull(),
    phone: varchar("phone", { length: 256 }),
    address: text("address"),
  },
  (table) => [uniqueIndex("email_idx").on(table.email)]
);

export const post = pgTable(
  "post",
  {
    id: uuid().primaryKey().defaultRandom(),
    slug: varchar().unique(),
    title: varchar({ length: 256 }),
    // One to Many
    authorId: uuid("author_id")
      .references(() => user.id)
      .notNull(),
  },
  (table) => [
    uniqueIndex("slug_idx").on(table.slug),
    index("title_idx").on(table.title),
  ]
);

export const category = pgTable("category", {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar("title").notNull(),
});

// Many to Many
export const postCategory = pgTable(
  "post_category",
  {
    postId: uuid("postId")
      .references(() => post.id)
      .notNull(),
    categoryId: uuid("categoryId")
      .references(() => category.id)
      .notNull(),
  },
  // Composite Primary Key
  (table) => [primaryKey({ columns: [table.postId, table.categoryId] })]
);

// RELATIONS

export const userRelations = relations(user, ({ one, many }) => ({
  posts: many(post),
}));

export const postRelations = relations(post, ({ one, many }) => ({
  author: one(user, {
    fields: [post.authorId],
    references: [user.id],
  }),
}));
