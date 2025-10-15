// So when a user asks for tweets:
// User -> Controller -> Service -> Repository -> Database
// ...and the data comes back the same way in reverse.

import {
  TweetCreateModel,
  TweetExtendedModel,
} from "@/db/schemas/tweet.schema";
import { getNextServerSession } from "@/lib/next-auth";
import {
  create,
  find,
  findOneById,
  findRepliesByUserId,
  findTweetsByUserId,
} from "@/repositories/tweets.repository";
import {
  create as createLike,
  deleteLike,
} from "@/repositories/likes.repository";
import { getUserById } from "./users.service";

export const getTweets = async (searchTerm?: string | null) => {
  // call repository to get base tweets (type from repo: TweetModel[])
  const tweets = await find(searchTerm ?? null);

  return tweets as TweetExtendedModel[];
};

export const getUsersTweets = async (userId: string) => {
  const user = await getUserById(userId);

  if (!user) {
    return [];
  }

  return findTweetsByUserId(userId);
};

export const getUsersReplies = async (userId: string) => {
  const user = await getUserById(userId);

  if (!user) {
    return [];
  }

  return findRepliesByUserId(userId);
};

export const getUsersLikedTweets = async (userId: string) => {
  const user = await getUserById(userId);

  if (!user) {
    return [];
  }

  return findRepliesByUserId(userId);
};

export const getTweetById = async (id: string) => {
  // Simple delegation to the repository.
  const tweet = await findOneById(id);

  return tweet;
};

export const createTweet = async (tweet: TweetCreateModel) => {
  // Call repository 'create' which performs the DB insert and returns the inserted row.
  const createdTweet = await create(tweet);

  console.log("created tweet: ", createdTweet);

  // Retrun the created row to the caller (controller or API route)
  return createdTweet;
};

export const likeTweet = async (tweetId: string) => {
  const session = await getNextServerSession();

  if (!session?.user.id) {
    return;
  }

  await createLike(tweetId, session.user.id);
};

export const unlikeTweet = async (tweetId: string) => {
  const session = await getNextServerSession();

  if (!session?.user.id) {
    return;
  }

  await deleteLike(tweetId, session.user.id);
};
