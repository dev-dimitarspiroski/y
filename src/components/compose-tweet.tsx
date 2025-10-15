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
  onSubmit?: () => void;
};

export default function ComposeTweet({
  onSubmit = () => void 0, // Default to a no-op function
}: ComposeTweetProps) {
  const [value, setValue] = useState(""); // Holds the text entered by the user
  const [originalTweet, setOriginalTweet] = useState<TweetModel>(); // Holds data of the tweet being replied to (if any)
  const [type, setType] = useState<TweetType>(TweetType.Tweet); // Type of tweet (Tweet or Reply)
  const [repliedToId, setRepliedToId] = useState(""); // ID of the tweet being replied to
  const { data: session } = useSession();

  const searchParams = useSearchParams(); // Hook to read query parameters from the URL

  useEffect(() => {
    // Get "type" from query parameters (e.g. ?type=Reply)
    const typeParam = searchParams.get("type");
    setType((typeParam as TweetType) || TweetType.Tweet);

    // Get "repliedToId" from query parameters (e.g. ?repliedToId=123)
    const id = searchParams.get("repliedToId");

    if (type === TweetType.Reply && id) {
      setRepliedToId(id);

      // Fetch original tweet data from API
      fetch(`http://localhost:3000/api/tweets/${id}`)
        .then((res) => res.json())
        .then((body) => setOriginalTweet(body));
    } else {
      // Reset states if not replying
      setRepliedToId("");
      setOriginalTweet(undefined);
    }
  }, [searchParams, type]); // Re-run when search params or type changes

  if (!session) return null;

  return (
    <>
      {/* If replying, show the original tweet being replied to */}
      {originalTweet && (
        <div>
          <p className="italic text-slate-400">{originalTweet.text}</p>
        </div>
      )}

      {/*  Main tweet composer layout */}
      <div className="flex flex-row p-4 gap-4 border-b-2 border-gray-600">
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
              await submitTweet(formData); // Create a new tweet
            }

            if (type === TweetType.Reply) {
              await submitReply(formData); // Create a reply to another tweet
            }

            setValue(""); // Reset the textarea value
            onSubmit(); // Notify parent that submission is complete;
          }}
        >
          <Textarea
            className="w-full border-t-0 border-l-0 border-r-0 rounded-none"
            placeholder="Compose your tweet..."
            name="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          {/* Hidden input to include repliedToId if this is a reply */}
          {/* A hidden input is a form element (<input type="hidden" /> that stores data you want to send to the server
          but don't want the user to see or edit directly in the UI) */}
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
