import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { TweetType } from "@/types/tweet-type.enum";
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import {
  UserLikedTweetsCreateModel,
  UserLikedTweetsModel,
  usersLikedTweets,
} from "./user_liked_tweets";
import { UserModel, users } from "./user.schema";

export const tweets = pgTable("tweets", {
  id: uuid("id").primaryKey().defaultRandom(),
  text: varchar("text", { length: 280 }).notNull(),
  type: varchar("type", {
    enum: [TweetType.Tweet, TweetType.Reply, TweetType.Repost],
  })
    .default(TweetType.Tweet)
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),

  // Extend the 'tweets' table to include self-referencing foreign keys
  // These allow us to connect tweets to other tweets
  originalTweetId: uuid("original_tweet_id"),
  repliedToId: uuid("replied_to_id"),
  authorId: uuid("author_id").notNull(),
});

export const tweetsRelations = relations(tweets, ({ one, many }) => ({
  // A tweet can have many reposts (other tweets that reference it as 'originalTweetId');
  reposts: many(tweets, { relationName: "reposts" }),

  // A tweet can be a repost of ONE original tweet
  originalTweet: one(tweets, {
    fields: [tweets.originalTweetId], // local field in this table,
    references: [tweets.id], // points to 'id' of another tweet
    relationName: "reposts", // link it to the reposts relation above
  }),

  // A tweet can have many replies (other tweets that reference it as 'repliedToId');
  replies: many(tweets, { relationName: "replies" }),

  // A tweet can reply to ONE other tweet
  repliedTo: one(tweets, {
    fields: [tweets.repliedToId],
    references: [tweets.id],
    relationName: "replies",
  }),

  // A tweet can be liked by many users
  // This usually goes through a join table 'usersLikedTweets; (userId -> tweetId);
  likes: many(usersLikedTweets),
  author: one(users, {
    fields: [tweets.authorId], // tweet.authorId is the Foreign Key
    references: [users.id], // users.id is the Primary Key on the users table
    relationName: "author",
  }),
}));

export type TweetModel = InferSelectModel<typeof tweets>;
export type TweetCreateModel = InferInsertModel<typeof tweets>;

export type TweetExtendedModel = TweetModel & {
  reposts: TweetModel[]; // list of tweets that reposted this tweet
  replies: TweetModel[]; // list of direct replies to this tweet
  repliedTo: TweetModel; // the tweet this one replied to (if any)
  originalTweet: TweetExtendedModel;
  likes: UserLikedTweetsModel[];
  author: UserModel;
};

// TweetModel & { ... } is an intersection type.
