"use server";

import { followUser } from "@/services/users.service";
import { revalidatePath } from "next/cache";

export default async function followUserAction(formData: FormData) {
  const followerId = formData.get("followerId") as string;
  const followeeId = formData.get("followeeId") as string;

  console.log("FOLLOWER ID: ", followerId);
  console.log("FOLLOWEE ID: ", followeeId);

  await followUser(followerId, followeeId); // Inserts the follow relationship in the database

  revalidatePath("/", "page");
}
