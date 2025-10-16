import {
  pgTable,
  varchar,
  text,
  timestamp,
  uuid,
  pgEnum,
  index,
  real,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

export const UserRole = pgEnum("user_role", ["ADMIN", "USER"]);

export const UserTable = pgTable(
  "user",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    role: UserRole("role").default("USER").notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [
    index("email_idx")
      .on(t.email)
      .concurrently() // create index without locking table
      .where(sql`${t.role} = 'USER'`) // partial index for only users with role USER
      .with({ fillfactor: "70" }), // Postgres storage option

    index("created_at_idx").on(t.createdAt),
  ]
);

export const UserPreferencesTable = pgTable(
  "user_preferences",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .references(() => UserTable.id, { onDelete: "cascade" })
      .notNull(),
    theme: varchar("theme", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [index("user_id_idx").on(t.userId)]
);

export const PostTable = pgTable("post", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  averageRating: real("average_rating").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  authorId: uuid("author_id")
    .references(() => UserTable.id, {
      onDelete: "no action",
    })
    .notNull(),
});

export const CategoryTable = pgTable("category", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const PostCategoryTable = pgTable(
  "post_category",
  {
    postId: uuid("post_id")
      .references(() => PostTable.id, { onDelete: "cascade" })
      .notNull(),
    categoryId: uuid("category_id")
      .references(() => CategoryTable.id, { onDelete: "cascade" })
      .notNull(),
  },
  (t) => [primaryKey({ columns: [t.postId, t.categoryId] })]
);

// Relations

export const UserRelations = relations(UserTable, ({ many, one }) => ({
  posts: many(PostTable),
  preferences: one(UserPreferencesTable),
}));

export const UserPreferencesTableRelations = relations(
  UserPreferencesTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [UserPreferencesTable.userId],
      references: [UserTable.id],
    }),
  })
);

export const PostTableRelations = relations(PostTable, ({ one, many }) => ({
  author: one(UserTable, {
    fields: [PostTable.authorId],
    references: [UserTable.id],
  }),
  categories: many(PostCategoryTable),
}));

export const CategoryTableRelations = relations(CategoryTable, ({ many }) => ({
  posts: many(PostCategoryTable),
}));
