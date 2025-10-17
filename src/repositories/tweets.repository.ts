import { and, desc, eq, ilike, inArray, ne } from "drizzle-orm";
import { db } from "../db";
import {
  TweetCreateModel,
  TweetModel,
  tweets,
} from "@/db/schemas/tweet.schema";
import { TweetType } from "@/types/tweet-type.enum";
import { users } from "@/db/schemas/user.schema";
import { follows } from "@/db/schemas/users_follows.schema";
import { usersLikedTweets } from "@/db/schemas/user_liked_tweets";

export const find = (searchTerm: string | null): Promise<TweetModel[]> => {
  try {
    return db.query.tweets.findMany({
      where: ilike(tweets.text, `%${searchTerm ?? ""}%`),
      orderBy: desc(tweets.createdAt),
      with: {
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
    where: and(eq(tweets.authorId, userId), ne(tweets.type, TweetType.Reply)),
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
    where: and(eq(tweets.authorId, userId), eq(tweets.type, TweetType.Reply)),
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

export const findTweetsFromFollowers = (userId: string) =>
  db
    .select({ tweet: tweets, author: users })
    .from(tweets)
    .innerJoin(users, eq(tweets.authorId, users.id))
    .innerJoin(follows, eq(follows.followerId, users.id))
    .where(eq(follows.followeeId, userId))
    .orderBy(desc(tweets.createdAt))
    .then((rows) => rows.map((row) => ({ ...row.tweet, author: row.author })));

export const findLikedTweets = async (
  userId: string
): Promise<TweetModel[]> => {
  const liked = await db
    .select({ tweetId: usersLikedTweets.tweetId })
    .from(usersLikedTweets)
    .where(eq(usersLikedTweets.userId, userId));

  const tweetIds = liked.map((r) => r.tweetId);
  if (tweetIds.length === 0) return [];

  return db.query.tweets.findMany({
    where: inArray(tweets.id, tweetIds),
    orderBy: desc(tweets.createdAt),
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

export const findOneById = (id: string) => {
  try {
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
    console.error(error);
  }
};

export const create = (tweet: TweetCreateModel): Promise<TweetModel> => {
  return db
    .insert(tweets)
    .values(tweet)
    .returning()
    .then((res) => res?.[0]);
};

export const deleteTweetFromDb = async (
  id: string
): Promise<TweetModel | undefined> => {
  return db
    .delete(tweets)
    .where(eq(tweets.id, id))
    .returning()
    .then((res) => res?.[0]);
};
