"use client";

import { TweetExtendedModel } from "@/db/schemas/tweet.schema";
import Tweet from "./tweet";
import { useEffect, useState } from "react";

type TweetProps = {
  tweets: TweetExtendedModel[];
};

export default function Tweets({ tweets }: TweetProps) {
  const [renderedTweets, setRenderedTweets] = useState(tweets);

  useEffect(() => {
    setRenderedTweets(tweets);
  }, [tweets]);

  return (
    <div>
      {renderedTweets.map((tweet) => {
        return <Tweet key={tweet.id} tweet={tweet} />;
      })}
    </div>
  );
}
