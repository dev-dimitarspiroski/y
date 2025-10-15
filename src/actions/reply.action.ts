"use server";

import { TweetCreateModel } from "@/db/schemas/tweet.schema";
import { createTweet } from "@/services/tweets.service";
import { TweetType } from "@/types/tweet-type.enum";
import { revalidatePath } from "next/cache";

export async function submitReply(formData: FormData) {
  const text = formData.get("text") as string;
  const repliedToId = formData.get("repliedToId") as string;
  const authorId = formData.get("authorId") as string;

  const tweet: TweetCreateModel = {
    text, // The text the user entered
    type: TweetType.Reply, // Marks it as a reply
    repliedToId, // Link between the reply and the tweet that it is responding to
    authorId, // Link between the reply and the author
  };

  await createTweet(tweet);

  revalidatePath("/feed", "page");
}
