import { db } from "@/db";
import { follows } from "@/db/schemas/users_follows.schema";
import { and, eq } from "drizzle-orm";

export async function create(followerId: string, followeeId: string) {
  return db
    .insert(follows)
    .values({ followerId, followeeId })
    .returning()
    .then((res) => res?.[0]);
}

export async function deleteFollow(followerId: string, followeeId: string) {
  return db.delete(follows).where(
    and(
      eq(follows.followerId, followerId), // Match the follower ID
      eq(follows.followeeId, followeeId) // Match the followee ID
    )
  );
}
