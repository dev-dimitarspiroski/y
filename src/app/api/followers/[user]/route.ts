import { getFollowers } from "@/services/users.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ user: string }> }
) {
  const { user } = await context.params;
  const tweets = await getFollowers(user);

  return NextResponse.json(tweets);
}
