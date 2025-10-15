import { db } from "@/db";
import { UserCreateModel, UserModel, users } from "@/db/schemas/user.schema";
import { eq } from "drizzle-orm";

export const findByUsername = (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username), // Match the username field.
    with: {
      followers: true,
      following: true,
    },
  });
};

export const findById = (id: string) =>
  db.query.users.findFirst({ where: eq(users.id, id) });

export const create = (user: UserCreateModel): Promise<UserModel> =>
  db
    .insert(users) // Insert into the users table
    .values(user) // Use the provided user data
    .returning() // Returns the inserted record (user)
    .then((res) => res?.[0]); // Get the first result

export const update = (
  id: string,
  userData: Omit<UserCreateModel, "password">
) =>
  db
    .update(users) // Update the users table.
    .set(userData) // Set new values.
    .where(eq(users.id, id)) // Match the user by ID.
    .returning() // Return the updated record.
    .then((res) => res?.[0]);
