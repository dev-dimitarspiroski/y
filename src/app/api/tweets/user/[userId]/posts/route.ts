import { getUsersTweets } from "@/services/tweets.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { userId } }: { params: { userId: string } }
) {
  const tweets = await getUsersTweets(userId);

  return NextResponse.json(tweets);
}
