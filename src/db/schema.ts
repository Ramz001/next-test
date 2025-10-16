import {
  pgTable,
  varchar,
  text,
  timestamp,
  uuid,
  pgEnum,
  index,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const UserRole = pgEnum("user_role", ["ADMIN", "USER"]);

export const UserTable = pgTable(
  "user",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    role: UserRole("role").default("USER").notNull(),
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
  },
  (t) => [index("user_id_idx").on(t.userId)]
);
