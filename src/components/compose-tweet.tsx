"use client";

import { AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { submitTweet } from "@/actions/create-tweet.action";
import { TweetModel } from "@/db/schemas/tweet.schema";
import { TweetType } from "@/types/tweet-type.enum";
import { useSearchParams } from "next/navigation";
import { submitReply } from "@/actions/reply.action";
import { useSession } from "next-auth/react";

type ComposeTweetProps = {
  isReply: boolean;
  repliedToId: string;
  onSubmit?: () => void;
};

export default function ComposeTweet({
  isReply,
  repliedToId,
  onSubmit = () => void 0,
}: ComposeTweetProps) {
  const [value, setValue] = useState("");
  const [originalTweet, setOriginalTweet] = useState<TweetModel>();
  const [type, setType] = useState<TweetType>(TweetType.Tweet);
  const { data: session } = useSession();

  const searchParams = useSearchParams();

  useEffect(() => {
    setType(isReply ? TweetType.Reply : TweetType.Tweet);

    if (type === TweetType.Reply && repliedToId) {
      fetch(`/api/tweets/${repliedToId}`)
        .then((res) => res.json())
        .then((body) => setOriginalTweet(body));
    } else {
      setOriginalTweet(undefined);
    }
  }, [searchParams, type]);

  if (!session) return null;

  return (
    <>
      {originalTweet && (
        <div>
          <p className="whitespace-break-spaces italic text-slate-400">
            {originalTweet.text}
          </p>
        </div>
      )}

      <div className="flex flex-row p-4 gap-4">
        <div>
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              className="w-12 h-12 rounded-full"
            />
            <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>
        </div>
        <form
          className="w-full flex flex-col items-end"
          action={async (formData) => {
            if (type === TweetType.Tweet) {
              await submitTweet(formData);
            }

            if (type === TweetType.Reply) {
              await submitReply(formData);
            }

            setValue("");
            onSubmit();
          }}
        >
          <Textarea
            className="w-full border-t-0 border-l-0 border-r-0 rounded-none"
            placeholder="Compose your tweet..."
            name="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <input type="hidden" name="repliedToId" value={repliedToId} />
          <input type="hidden" name="authorId" value={session?.user.id} />
          <Button
            className="mt-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
            disabled={!value}
            type="submit"
          >
            Post
          </Button>
        </form>
      </div>
    </>
  );
}
