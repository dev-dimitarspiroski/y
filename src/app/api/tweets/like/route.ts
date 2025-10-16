import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { likeTweet, unlikeTweet } from "@/services/tweets.service";

export async function POST(req: Request) {
  try {
    const { tweetId, like, path } = await req.json();

    if (!tweetId || typeof like !== "boolean") {
      return NextResponse.json(
        { ok: false, message: "Invalid payload" },
        { status: 400 }
      );
    }

    if (like) {
      await likeTweet(tweetId);
    } else {
      await unlikeTweet(tweetId);
    }

    if (typeof path === "string" && path.length > 0) {
      revalidatePath(path);
    }

    // make sure tweet detail page is fresh too
    revalidatePath("/feed", "page");
    revalidatePath(`/tweet/${tweetId}`);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("like API error", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
