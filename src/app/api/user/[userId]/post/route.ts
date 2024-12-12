import apiWithAuth from "@/lib/apiWithAuth";
import { getPosts } from "@/lib/services/post";
import type { AppRouteHandlerFnContext, NextAuthRequest } from "@/lib/types/api";
import type { Post } from "@/lib/types/posts";
import { NextResponse } from "next/server";

export interface UserPostRouteContext extends AppRouteHandlerFnContext {
  params?: Promise<{
    userId?: string
  }> | undefined
}

export const GET = apiWithAuth({
  authorize: async (user, request, { params }: UserPostRouteContext) => {
    const { userId } = await (params ?? {});
    return user.id === userId;
  },
}, async (
  request: NextAuthRequest,
  { params }: UserPostRouteContext,
): Promise<NextResponse<{ posts: Post[] } | { error: string }>> => {
  try {
    const { userId } = await (params ?? {});
    const { searchParams } = new URL(request.url);
    const sortOrder = (searchParams.get("sortOrder") || "desc") as "asc" | "desc";
    const posts = await getPosts({ userId, sortOrder });

    return NextResponse.json({ posts });
  }
  catch (error) {
    console.error("Failed to fetch posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 },
    );
  }
});
