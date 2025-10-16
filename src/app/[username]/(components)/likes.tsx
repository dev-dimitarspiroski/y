"use client"

import Tweets from "@/components/tweets";
import { TweetExtendedModel } from "@/db/schemas/tweet.schema";
import { useEffect, useState } from "react";

export default function Likes({ userId }: { userId: string }) {
  const [tweets, setTweets] = useState<TweetExtendedModel[]>([]);

  useEffect(() => {
    fetch(`/api/tweets/user/${userId}/likes`)
      .then((res) => res.json())
      .then((tweetsRes) => setTweets(tweetsRes));
  }, [userId]);

  return <Tweets tweets={tweets} />;
}
