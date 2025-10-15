import { TweetType } from "@/types/tweet-type.enum";
import { Tweet } from "@/types/tweet.interface";
import { User } from "@/types/user.interface";

const USER_1 = {
  id: "1",
  name: "John Doe",
  avatar: "https://picsum.photos/200",
  username: "johndoe",
  joinDate: "2023-05-01T00:00:00.000Z", // ISO date format
  followers: [],
  following: [],
} satisfies User;

const USER_2 = {
  id: "2",
  name: "Jane Doe",
  avatar: "https://picsum.photos/200",
  username: "janedoe",
  joinDate: "2024-05-01T00:00:00.000Z", // ISO date format
  followers: [],
  following: [],
} satisfies User;

const USER_3 = {
  id: "3",
  name: "Alice Smith",
  avatar: "https://picsum.photos/200",
  username: "alicesmith",
  joinDate: "2024-01-01T00:00:00.000Z", // ISO date format
  followers: [],
  following: [],
} satisfies User;

const USER_4 = {
  id: "4",
  name: "Bob Bobsky",
  avatar: "https://picsum.photos/200",
  username: "bobbobsky",
  joinDate: "2025-01-01T00:00:00.000Z", // ISO date format
  followers: [],
  following: [],
} satisfies User;

const TWEET_REPLY = {
  id: "10",
  text: "Hello from tweet reply!",
  likes: [],
  reposts: [],
  replies: [],
  type: TweetType.Reply,
  author: USER_1,
  createdAt: "2024-09-20T12:30:00.000Z", // ~1 year ago
} satisfies Tweet;

const TWEET_REPOST = {
  id: "11",
  text: "Hello from tweet repost!",
  likes: [],
  reposts: [],
  replies: [],
  type: TweetType.Repost,
  author: USER_1,
  createdAt: "2025-01-15T09:00:00.000Z", // earlier this year
} satisfies Tweet;

export const TWEETS = [
  {
    id: "1",
    text: "Hello, world! #reactjs #nextjs",
    likes: [],
    reposts: [],
    replies: [],
    type: TweetType.Tweet,
    author: USER_1,
    createdAt: "2023-11-10T14:30:00.000Z", // ~2 years ago
  },
  {
    id: "2",
    text: "Just setting up my twitter clone.",
    likes: [],
    reposts: [],
    replies: [],
    type: TweetType.Tweet,
    author: USER_2,
    createdAt: "2025-09-24T14:30:00.000Z", // yesterday
  },
  {
    id: "3",
    text: "Hello, world!",
    likes: [USER_1],
    reposts: [TWEET_REPOST],
    replies: [TWEET_REPLY],
    type: TweetType.Tweet,
    author: USER_3,
    createdAt: "2025-09-25T15:30:00.000Z", // very recent
  },
  {
    id: "4",
    text: "Just setting up my twitter clone.",
    likes: [USER_2],
    reposts: [TWEET_REPOST],
    replies: [TWEET_REPLY],
    type: TweetType.Tweet,
    author: USER_4,
    createdAt: "2025-09-20T14:30:00.000Z", // yesterday
  },
] satisfies Tweet[];
