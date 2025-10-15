"use server";

import { UserCreateModel } from "@/db/schemas/user.schema";
import { createUser } from "@/services/users.service";
import { redirect } from "next/navigation";

export default async function registerUser(formData: FormData) {
  const newUser: UserCreateModel = {
    name: formData.get("name") as string, // Gets the 'name' field
    username: formData.get("username") as string, // Gets the 'username' field
    password: formData.get("password") as string, // Gets the 'password' field
  };

  // Creates the user in the database
  await createUser(newUser);

  redirect("/login");
}
