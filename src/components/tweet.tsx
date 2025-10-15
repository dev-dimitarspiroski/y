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
import { formatDate } from "@/lib/format-date";
import { TweetExtendedModel } from "@/db/schemas/tweet.schema";
import { cn } from "@/lib/utils";
import { TweetType } from "@/types/tweet-type.enum";
import { repostTweet } from "@/actions/repost-tweet.action";
import { useSession } from "next-auth/react";
import likeTweetAction from "@/actions/like-tweet.action";

type TweetProps = {
  tweet: TweetExtendedModel;
};

export default function Tweet({ tweet }: TweetProps) {
  const { data: session } = useSession();
  const isLikedByCurrentUser = tweet.likes?.some(
    (like) => like.userId === session?.user.id
  );

  return (
    // Container for a single tweet
    <div
      className={cn("flex flex-col", tweet.type === TweetType.Tweet && "pt-4")}
    >
      {/* Conditional: Label if this is a Reply */}
      {tweet.type === TweetType.Reply && (
        <div className="flex flex-row gap-2 items-center text-sm font-bold text-slate-500 mt-5 mb-2 ml-5">
          <ArrowUturnUpIcon className="size-5 text-slate-500 cursor-pointer" />
          Reply to &ldquo;{tweet.repliedTo?.text}&ldquo;
        </div>
      )}

      {/* Conditional: Show label if this is a Repost */}
      {tweet.type === TweetType.Repost && (
        <div className="flex flex-row gap-2 items center text-sm font-bold text-slate-500 mt-5 mb-2 ml-5">
          <ArrowPathRoundedSquareIcon className="size-5 text-slate-500 cursor-pointer" />
          {tweet.author.name} reposted
        </div>
      )}

      {/* Tweet Content Section */}
      <div className="flex flex-row pl-4 pr-4 pb-4 gap-4 border-b-[1px] border-gray-600">
        {/* Avatar / Author Image */}
        <div>
          <Link href={`/${tweet.author?.username}`}>
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                className="w-12 h-12 rounded-full"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
        </div>

        {/* Main content column */}
        <div className="w-full flex flex-col">
          {/* Author name, username, and timestamp */}
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
            {/* Date links to the tweet details page */}
            <p className="text-slate-500 hover:underline">
              <Link href={`/tweet/${tweet.id}`}>
                {formatDate(tweet.createdAt)}
              </Link>
            </p>
          </div>

          {/* Tweet text content */}
          <p>{tweet.text}</p>

          {/* Action buttons: reply, repost, like, share */}
          <div className="flex flex-row gap-4 items-center mt-2 justify-between">
            {/* Reply Button - navigates to compose page with query params */}
            <div>
              <Link
                className="flex flex-row gap-2 items-center"
                href={`/feed/compose?type=${TweetType.Reply}&repliedToId=${tweet.id}`}
              >
                <ChatBubbleOvalLeftIcon className="size-7 text-slate-500 cursor-pointer" />
                <span>{tweet.replies?.length ?? 0}</span>
              </Link>
            </div>

            {/* Repost Button - uses a form to trigger server action */}
            <form action={repostTweet}>
              <button className="flex flex-row gap-2 items-center">
                <ArrowPathRoundedSquareIcon className="size-7 text-slate-500 cursor-pointer" />
                <span>{tweet.reposts?.length ?? 0}</span>
              </button>
              {/* Hidden inputs pass data to the server action */}
              <input type="hidden" name="text" value={tweet.text} />
              <input type="hidden" name="originalTweetId" value={tweet.id} />
              <input type="hidden" name="authorId" value={session?.user.id} />
            </form>

            {/* Like/Unlike Button */}
            <form action={likeTweetAction}>
              <input type="hidden" name="tweetId" value={tweet.id} />
              <input
                type="hidden"
                name="isLiked"
                value={isLikedByCurrentUser ? "true" : "false"}
              />
              <button className="flex flex-row gap-2 items-center disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                {!isLikedByCurrentUser ? (
                  <HeartIcon className="size-7 text-slate-500" />
                ) : (
                  <HeartIconSolid
                    className={cn("size-7 text-slate-500", "text-red-500")}
                  />
                )}
                <span>{tweet.likes?.length ?? 0}</span>
              </button>
            </form>
            {/* <div className="flex flex-row gap-2 items-center">
              <HeartIcon className="size-7 text-slate-500 cursor-pointer" />
              <span>0</span>
            </div> */}

            {/* Share Button - link to tweet details page */}
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
