import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { users } from "./user.schema";
import { tweets } from "./tweet.schema";
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";

export const usersLikedTweets = pgTable(
  "user_liked_tweets",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    tweetId: uuid("tweet_id")
      .notNull()
      .references(() => tweets.id),
  },
  (table) => ({ pk: primaryKey({ columns: [table.userId, table.tweetId] }) })
);

export const usersLikedTweetsRelations = relations(
  usersLikedTweets,
  ({ one }) => ({
    tweet: one(tweets, {
      fields: [usersLikedTweets.tweetId],
      references: [tweets.id],
    }),
    user: one(users, {
      fields: [usersLikedTweets.userId],
      references: [users.id],
    }),
  })
);

export type UserLikedTweetsModel = InferSelectModel<typeof usersLikedTweets>;
export type UserLikedTweetsCreateModel = InferInsertModel<
  typeof usersLikedTweets
>;
