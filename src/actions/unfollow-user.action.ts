"use server";
import { unfollowUser } from "@/services/users.service";
import { revalidatePath } from "next/cache";

export default async function unfollowUserAction(formData: FormData) {
  const followerId = formData.get("followerId") as string;
  const followeeId = formData.get("followeeId") as string;

  await unfollowUser(followerId, followeeId);

  revalidatePath("/", "page")
}
