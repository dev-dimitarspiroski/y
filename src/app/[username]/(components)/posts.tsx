"use client";

import { useEffect, useState } from "react";
import Tweets from "@/components/tweets";
import { TweetExtendedModel } from "@/db/schemas/tweet.schema";

export default function Posts({ userId }: { userId: string }) {
  const [tweets, setTweets] = useState<TweetExtendedModel[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/tweets/user/${userId}/posts`)
      .then((res) => res.json()) // Parse the response as JSON.
      .then((tweetsRes) => setTweets(tweetsRes)); // Update state with the fetched tweets
  }, [userId]); // Dependency array: re-run effect if userId changes.

  return <Tweets tweets={tweets} />;
}
