import ComposeTweet from "@/components/compose-tweet";
import Tweets from "@/components/tweets";
import { TweetExtendedModel } from "@/db/schemas/tweet.schema";
import { getTweets } from "@/services/tweets.service";

export default async function Following() {
  const tweets = await getTweets();

  return (
    <div>
      <ComposeTweet />
      <Tweets tweets={tweets as TweetExtendedModel[]} />
    </div>
  );
}
