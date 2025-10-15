import { getUsersReplies } from "@/services/tweets.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { userId } }: { params: { userId: string } }
) {
  const tweets = await getUsersReplies(userId);

  return NextResponse.json(tweets);
}
