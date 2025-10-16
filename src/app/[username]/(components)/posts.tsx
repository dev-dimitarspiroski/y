"use client";

import { useEffect, useState } from "react";
import Tweets from "@/components/tweets";
import { TweetExtendedModel } from "@/db/schemas/tweet.schema";

export default function Posts({ userId }: { userId: string }) {
  const [tweets, setTweets] = useState<TweetExtendedModel[]>([]);

  useEffect(() => {
    fetch(`/api/tweets/user/${userId}/posts`)
      .then((res) => res.json())
      .then((tweetsRes) => setTweets(tweetsRes));
  }, [userId]);

  return <Tweets tweets={tweets} />;
}
