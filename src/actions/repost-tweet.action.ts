"use server";

import { TweetCreateModel } from "@/db/schemas/tweet.schema";
import { createTweet } from "@/services/tweets.service";
import { TweetType } from "@/types/tweet-type.enum";
import { revalidatePath } from "next/cache";

export async function repostTweet(formData: FormData) {
  const text = formData.get("text") as string;
  const originalTweetId = formData.get("originalTweetId") as string; // The ID of the tweet being reposted

  const tweet: TweetCreateModel = {
    text, // Caption or additional text for the repost
    originalTweetId, // Link this repost to the original tweet
    type: TweetType.Repost, // Identify (mark) this tweet as a "Repost"
  };

  await createTweet(tweet);

  revalidatePath("/feed", "page");
}
