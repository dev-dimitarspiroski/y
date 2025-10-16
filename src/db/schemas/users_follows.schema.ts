import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { users } from "./user.schema";
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";

export const follows = pgTable(
  "follows",
  {
    followerId: uuid("follower_id")
      .notNull()
      .references(() => users.id),
    followeeId: uuid("folowee_id")
      .notNull()
      .references(() => users.id),
  },

  (table) => ({
    pk: primaryKey({ columns: [table.followerId, table.followeeId] }),
  })
);

export const usersFollowersRelations = relations(follows, ({ one }) => ({
  follower: one(users, {
    fields: [follows.followerId],
    references: [users.id],
    relationName: "follows",
  }),

  followee: one(users, {
    fields: [follows.followeeId],
    references: [users.id],
    relationName: "followers",
  }),
}));

export type FollowModel = InferSelectModel<typeof follows>;
export type FollowCreateModel = InferInsertModel<typeof follows>;
