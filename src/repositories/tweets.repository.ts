import { and, desc, eq, ilike, ne } from "drizzle-orm";
import { db } from "../db";
import {
  TweetCreateModel,
  TweetModel,
  tweets,
} from "@/db/schemas/tweet.schema";
import { TweetType } from "@/types/tweet-type.enum";

export const find = (searchTerm: string | null): Promise<TweetModel[]> => {
  try {
    // ilike(...) produces a SQL `ILIKE` expression (Postgres) for case-insensitive search.
    return db.query.tweets.findMany({
      where: ilike(tweets.text, `%${searchTerm ?? ""}%`),
      // "with" tells Drizzle to include (join) related
      // instead of just the tweet itself

      // Sorts all tweets by creation date in descending order (newest first)
      orderBy: desc(tweets.createdAt),
      with: {
        // Include the tweet that this one replied to (if it's a reply)
        repliedTo: true,
        replies: true,
        reposts: true,
        likes: true,
        author: true,
      },
    });
  } catch (error) {
    console.log(error);
    return Promise.resolve([]);
  }
};

export const findTweetsByUserId = (userId: string) => {
  return db.query.tweets.findMany({
    where: and(eq(tweets.authorId, userId), ne(tweets.type, TweetType.Reply)), // Only tweets, not replies.
    with: {
      likes: true,
      author: true,
      replies: true,
      reposts: true,
      originalTweet: true,
      repliedTo: true,
    },
  });
};

export const findRepliesByUserId = (userId: string) => {
  return db.query.tweets.findMany({
    where: and(eq(tweets.authorId, userId), eq(tweets.type, TweetType.Reply)), // Only replies
    with: {
      likes: true,
      author: true,
      replies: true,
      reposts: true,
      originalTweet: true,
      repliedTo: true,
    },
  });
};

// export const findLikedTweetsByUserId = (userId: string) => {

// }

export const findOneById = (id: string) => {
  try {
    // eq(tweets.id, id) translates to SQL "WHERE id = $param" (parameterized).
    // findFirst() returns the first match (or 'null'/'undefined' depending on the drizzle version)
    return db.query.tweets.findFirst({
      where: eq(tweets.id, id),
      with: {
        likes: true,
        author: true,
        replies: true,
        reposts: true,
        originalTweet: true,
        repliedTo: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const create = (tweet: TweetCreateModel): Promise<TweetModel> => {
  return db
    .insert(tweets) // prepare INSERT into the 'tweet' table
    .values(tweet) // values to insert (TweetCreateModel)
    .returning() // ask Postgres to return the inserted row(s)
    .then((res) => res?.[0]); // take the first element of the return array
};
