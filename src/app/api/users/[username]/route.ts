import { getUserByUsername } from "@/services/users.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ username: string }> }
) {
  const { username } = await context.params;
  const user = await getUserByUsername(username);

  return NextResponse.json(user);
}
