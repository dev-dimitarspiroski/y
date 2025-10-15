import { db } from "@/db";
import { usersLikedTweets } from "@/db/schemas/user_liked_tweets";
import { and, eq } from "drizzle-orm";

export const create = (tweetId: string, userId: string) => {
  return db
    .insert(usersLikedTweets)
    .values({ tweetId, userId })
    .returning()
    .then((res) => res?.[0]);
};

export const deleteLike = (tweetId: string, userId: string) => {
  return db.delete(usersLikedTweets).where(
    and(
      eq(usersLikedTweets.tweetId, tweetId), // Match the tweet ID
      eq(usersLikedTweets.userId, userId) // Match the user ID
    )
  );
};
