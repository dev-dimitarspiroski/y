import Tweet from "@/components/tweet";
import Tweets from "@/components/tweets";
import { TweetExtendedModel } from "@/db/schemas/tweet.schema";
import { getTweetById } from "@/services/tweets.service";

type TweetDetailsProps = {
  params: Promise<{ id: string }>;
};

export default async function TweetDetails({ params }: TweetDetailsProps) {
  const { id } = await params;
  const tweet = (await getTweetById(id)) as TweetExtendedModel;

  if (!tweet) {
    return <h1>Tweet not found</h1>;
  }

  return (
    <div>
      <Tweet tweet={tweet as TweetExtendedModel} />
      <Tweets tweets={(tweet.replies as TweetExtendedModel[]) ?? []} />
    </div>
  );
}
