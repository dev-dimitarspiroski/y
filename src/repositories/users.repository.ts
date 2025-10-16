import { db } from "@/db";
import { UserCreateModel, UserModel, users } from "@/db/schemas/user.schema";
import { follows } from "@/db/schemas/users_follows.schema";
import { eq } from "drizzle-orm";

export const findByUsername = (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: {
      followers: true,
      following: true,
    },
  });
};

export const findById = (id: string) =>
  db.query.users.findFirst({ where: eq(users.id, id) });

export const findFollowers = (userId: string) =>
  db
    .select({ follower: users })
    .from(users)
    .innerJoin(follows, eq(follows.followerId, users.id))
    .where(eq(follows.followeeId, userId));

export const create = (user: UserCreateModel): Promise<UserModel> =>
  db
    .insert(users)
    .values(user)
    .returning()
    .then((res) => res?.[0]);

export const update = (
  id: string,
  userData: Omit<UserCreateModel, "password">
) =>
  db
    .update(users)
    .set(userData)
    .where(eq(users.id, id))
    .returning()
    .then((res) => res?.[0]);
