"use server";

import { likeTweet, unlikeTweet } from "@/services/tweets.service";
import { revalidatePath } from "next/cache";

export async function likeTweetAction(formData: FormData) {
  const isLikedByCurrentUser = formData.get("isLiked") === "true";
  const tweetId = formData.get("tweetId") as string;
  const path = (formData.get("revalidatePath") as string) ?? "/";

  if (!isLikedByCurrentUser) {
    await likeTweet(tweetId);
  } else {
    await unlikeTweet(tweetId);
  }
  console.log("PATH: ", path)
  revalidatePath(path);
  revalidatePath(`/tweet/${tweetId}`);
}
