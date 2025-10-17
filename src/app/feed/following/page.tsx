import ComposeTweet from "@/components/compose-tweet";
import Tweets from "@/components/tweets";
import { TweetExtendedModel } from "@/db/schemas/tweet.schema";
import { getNextServerSession } from "@/lib/next-auth";
import { getTweetsFromFollowers } from "@/services/tweets.service";

export default async function Following() {
  const session = await getNextServerSession();
  const tweetsFromFollowers = await getTweetsFromFollowers(
    session?.user.id ?? ""
  );

  return (
    <div>
      <ComposeTweet isReply={false} repliedToId="" />
      <Tweets tweets={tweetsFromFollowers as TweetExtendedModel[]} />
    </div>
  );
}
