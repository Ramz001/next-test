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

export const user = pgTable(
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
