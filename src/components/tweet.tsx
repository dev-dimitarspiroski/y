"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  ArrowPathRoundedSquareIcon,
  ArrowUturnUpIcon,
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { TweetExtendedModel } from "@/db/schemas/tweet.schema";
import { cn } from "@/lib/utils";
import { TweetType } from "@/types/tweet-type.enum";
import { repostTweet } from "@/actions/repost-tweet.action";
import { useSession } from "next-auth/react";
import { TweetDate } from "./ui/tweet-date";
import { usePathname } from "next/navigation";
import { useState, useTransition } from "react";

type TweetProps = {
  tweet: TweetExtendedModel;
};

export default function Tweet({ tweet }: TweetProps) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const initialLiked =
    tweet.likes?.some((l) => l.userId === session?.user?.id) ?? false;
  const [isLiked, setIsLiked] = useState<boolean>(initialLiked);
  const [likesCount, setLikesCount] = useState<number>(
    tweet.likes?.length ?? 0
  );
  const [isPending, startTransition] = useTransition();

  const toggleLike = () => {
    const next = !isLiked;
    setIsLiked(next);
    setLikesCount((count) => count + (next ? 1 : -1));

    startTransition(async () => {
      try {
        const res = await fetch("/api/tweets/like", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tweetId: tweet.id,
            like: next,
            path: pathname,
          }),
        });
        if (!res.ok) throw new Error("toggle failed");
      } catch (err) {
        setIsLiked((isLiked) => !isLiked);
        setLikesCount((count) => count + (next ? -1 : 1));
        console.error("Like toggle failed", err);
      }
    });
  };

  return (
    <div
      className={cn("flex flex-col", tweet.type === TweetType.Tweet && "pt-4")}
    >
      {tweet.type === TweetType.Reply && (
        <div className="flex flex-row gap-2 items-center text-sm font-bold text-slate-500 mt-5 mb-2 ml-5">
          <ArrowUturnUpIcon className="size-5 text-slate-500 cursor-pointer" />
          Reply to &ldquo;{tweet.repliedTo?.text}&ldquo;
        </div>
      )}

      {tweet.type === TweetType.Repost && (
        <div className="flex flex-row gap-2 items center text-sm font-bold text-slate-500 mt-5 mb-2 ml-5">
          <ArrowPathRoundedSquareIcon className="size-5 text-slate-500 cursor-pointer" />
          {tweet.author.name} reposted
        </div>
      )}

      <div className="flex flex-row pl-4 pr-4 pb-4 gap-4 border-b-1 border-gray-600">
        <div>
          <Link href={`/${tweet.author?.username}`}>
            <Avatar>
              <AvatarImage
                src={tweet.author?.avatar ?? "https://github.com/shadcn.png"}
                className="w-12 h-12 rounded-full"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
        </div>

        <div className="w-full flex flex-col">
          <div className="flex flex-row gap-2 items-center">
            <h1 className="font-bold">
              <Link href={`/${tweet.author?.username}`}>
                {tweet.type === TweetType.Repost
                  ? tweet.originalTweet?.author?.name
                  : tweet.author?.name}
              </Link>
            </h1>
            <h2 className="text-slate-500 text-sm">
              <Link href={`/${tweet.author?.username}`}>
                @
                {tweet.type === TweetType.Repost
                  ? tweet.originalTweet?.author?.username
                  : tweet.author?.username}
              </Link>
            </h2>
            <div className="text-slate-500 flex items-center justify-center">
              <div>-</div>
            </div>
            <p className="text-slate-500 hover:underline">
              <Link href={`/tweet/${tweet.id}`}>
                <TweetDate createdAt={tweet.createdAt} />
              </Link>
            </p>
          </div>

          <div className="whitespace-break-spaces">{tweet.text}</div>

          <div className="flex flex-row gap-4 items-center mt-2 justify-between">
            <div>
              <Link
                className="flex flex-row gap-2 items-center"
                href={`/feed/compose?type=${TweetType.Reply}&repliedToId=${tweet.id}`}
              >
                <ChatBubbleOvalLeftIcon className="size-7 text-slate-500 cursor-pointer" />
                <span>{tweet.replies?.length ?? 0}</span>
              </Link>
            </div>

            <form action={repostTweet}>
              <button className="flex flex-row gap-2 items-center">
                <ArrowPathRoundedSquareIcon className="size-7 text-slate-500 cursor-pointer" />
                <span>{tweet.reposts?.length ?? 0}</span>
              </button>

              <input type="hidden" name="text" value={tweet.text} />
              <input type="hidden" name="originalTweetId" value={tweet.id} />
              <input
                type="hidden"
                name="authorId"
                value={session?.user?.id ?? ""}
              />
            </form>

            <button
              onClick={toggleLike}
              disabled={isPending}
              aria-pressed={isLiked}
              className="flex flex-row gap-2 items-center disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {!isLiked ? (
                <HeartIcon className="size-7 text-slate-500" />
              ) : (
                <HeartIconSolid className="size-7 text-red-500" />
              )}
              <span>{likesCount}</span>
            </button>

            <div className="flex flex-row gap-2 items-center">
              <Link href={`/tweet/${tweet.id}`}>
                <LinkIcon className="size-7 text-slate-500 cursor-pointer" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
