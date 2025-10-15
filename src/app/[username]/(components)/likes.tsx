"use client";

import Tweets from "@/components/tweets";
import { TweetExtendedModel } from "@/db/schemas/tweet.schema";
import { useEffect, useState } from "react";

export default function Likes({ userId }: { userId: string }) {
  const [tweets, setTweets] = useState<TweetExtendedModel[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/tweets/user/${userId}/likes`)
      .then((res) => res.json())
      .then((tweetRes) => setTweets(tweetRes));
  });

  return <Tweets tweets={tweets} />;
}
