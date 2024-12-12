import { getPost } from "@/lib/services/post";
import type { Post } from "@/lib/types/posts";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
): Promise<NextResponse< { post: Post } | { error: string }>> {
  try {
    const { slug } = await params;
    const post = await getPost({ slug });

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ post });
  }
  catch (error) {
    console.error("Failed to fetch post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 },
    );
  }
}
