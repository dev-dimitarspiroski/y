"use server";

import { deleteTweet } from "@/services/tweets.service";
import { revalidatePath } from "next/cache";

export async function deleteTweetAction(formData: FormData) {
  const tweetId = formData.get("tweetId") as string;

  await deleteTweet(tweetId);

  revalidatePath("/feed", "page");
  revalidatePath("/feed/for-you", "page");
  revalidatePath("/feed/follow", "page");
}
