import { TWEETS } from "@/data/test-data";
import { getTweets } from "@/services/tweets.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Example request: GET /api/tweets?searchTerm=hello
  const searchTerm = req.nextUrl.searchParams?.get("searchTerm");

  console.log("searchTerm: ", searchTerm);

  // if (!searchTerm) {
  //   return NextResponse.json(TWEETS);
  // }

  // const filteredTweets = TWEETS.filter((tweet) =>
  //   tweet.text.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // return NextResponse.json(filteredTweets);

  const tweets = await getTweets(searchTerm);

  return NextResponse.json(tweets);
}
