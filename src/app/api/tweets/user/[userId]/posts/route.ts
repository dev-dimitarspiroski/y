import { getUsersTweets } from "@/services/tweets.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  const { userId } = await context.params;
  const tweets = await getUsersTweets(userId);

  return NextResponse.json(tweets);
}
