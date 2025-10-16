// app/actions.ts
"use server";
import { db } from "@/db/drizzle";
import { UserTable } from "@/db/schema";

export async function insertUser() {
  try {
    await db
      .insert(UserTable)
      .values({
        id: "1",
        name: "John",
        email: "john@example.com",
      })
      .returning()
      .onConflictDoUpdate({
        target: UserTable.email,
        set: { name: "Updated email" },
      });
  } catch (error) {
    console.log(error);
  }
}

export async function querySelectUser() {
  try {
    const user = db.query.UserTable.findMany({
      with: {},
    });
    return user;
  } catch (error) {
    console.log(error);
  }
}
