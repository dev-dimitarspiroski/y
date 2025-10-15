"use server";

import { TweetCreateModel } from "@/db/schemas/tweet.schema";
import { createTweet } from "@/services/tweets.service";
import { revalidatePath } from "next/cache";

export async function submitTweet(formData: FormData) {
  // Extract the "text" field from the form input.
  // If text's missing, use an empty string by default
  const tweet: TweetCreateModel = {
    text: (formData.get("text") as string) || "",
    authorId: formData.get("authorId") as string,
  };

  // Call the service function to actually create and save the tweet in the db.
  // This is asynchronous, so it will return a Promise.
  await createTweet(tweet);

  revalidatePath("feed", "page");
  revalidatePath("feed/for-you", "page");
  revalidatePath("feed/follow", "page");
}
