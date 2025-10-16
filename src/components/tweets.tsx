"use client";

import { TweetExtendedModel } from "@/db/schemas/tweet.schema";
import Tweet from "./tweet";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type TweetProps = {
  tweets: TweetExtendedModel[];
};

export default function Tweets({ tweets }: TweetProps) {
  const { data: session } = useSession();
  const [renderedTweets, setRenderedTweets] = useState(tweets);

  useEffect(() => {
    setRenderedTweets(tweets);
  }, [tweets]);

  return (
    <div className="border-t-1 border-gray-600">
      {renderedTweets.map((tweet) => {
        const key = `${tweet.id}-${tweet.likes?.length ?? 0}-${session?.user?.id ?? "anon"}`;
        return <Tweet key={key} tweet={tweet} />;
      })}
    </div>
  );
}
