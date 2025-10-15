"use server";

import { UserCreateModel } from "@/db/schemas/user.schema";
import { updateUser } from "@/services/users.service";
import { redirect } from "next/navigation";

export default async function editUserAction(formData: FormData) {
  const id = formData.get("id") as string;

  const user: Omit<UserCreateModel, "password"> = {
    name: formData.get("name") as string,
    username: formData.get("username") as string,
    location: formData.get("location") as string,
    url: formData.get("url") as string,
    avatar: formData.get("avatar") as string,
    description: formData.get("description") as string,
  };

  await updateUser(id, user);

  redirect(`/${user.username}`);
}
