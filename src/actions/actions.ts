// app/actions.ts
'use server'
import { db } from '@/db/drizzle'
import { user } from '@/db/schema'

export async function insertUser() {
  try {
    await db
      .insert(user)
      .values({
        id: '1',
        name: 'John',
        email: 'john@example.com',
      })
      .returning()
      .onConflictDoUpdate({
        target: user.email,
        set: { name: 'Updated email' },
      })
  } catch (error) {
    console.log(error)
  }
}

export async function querySelectUser() {
  try {
    const user = db.query.user.findMany({
      with: {},
    })
    return user
  } catch (error) {
    console.log(error)
  }
}
