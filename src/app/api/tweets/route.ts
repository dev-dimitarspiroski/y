import { getTweets } from "@/services/tweets.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchTerm = req.nextUrl.searchParams?.get("searchTerm");

  const tweets = await getTweets(searchTerm);

  return NextResponse.json(tweets);
}
