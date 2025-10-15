import { TweetExtendedModel } from "@/db/schemas/tweet.schema";
import Tweet from "./tweet";

type TweetProps = {
  tweets: TweetExtendedModel[];
};

export default function Tweets({ tweets }: TweetProps) {
  return (
    <div>
      {tweets.map((tweet) => {
        return <Tweet key={tweet.id} tweet={tweet} />;
      })}
    </div>
  );
}
