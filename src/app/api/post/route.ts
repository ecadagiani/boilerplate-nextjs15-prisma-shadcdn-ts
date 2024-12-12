import { internalServerError, jsonData } from "@/lib/apiResponse";
import { getPosts } from "@/lib/services/post";
import type { Post } from "@/lib/types/posts";

export async function GET(
  request: Request,
) {
  try {
    const { searchParams } = new URL(request.url);
    const posts = await getPosts({
      published: true,
      sortOrder: searchParams.get("sortOrder") as "asc" | "desc" ?? undefined,
    });

    return jsonData<{ posts: Post[] }>({ posts });
  }
  catch (error) {
    console.error("Failed to fetch posts:", error);
    return internalServerError();
  }
}
