import type { Post } from "@/lib/types/posts";
import api from "@/query/axios";

export async function queryPosts({
  sortOrder = "desc",
  userId = null,
}: {
  sortOrder?: "desc" | "asc"
  userId?: string | null
}): Promise<Post[]> {
  const response = await api.get<{ posts: Post[] }>("/post", {
    params: { sortOrder, userId },
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch posts");
  }

  return response.data.posts;
}

export async function queryUserPosts({
  sortOrder = "desc",
  userId = null,
}: {
  sortOrder?: "desc" | "asc"
  userId?: string | null
}): Promise<Post[]> {
  const response = await api.get<{ posts: Post[] }>(`/user/${userId}/post`, {
    params: { sortOrder },
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch posts");
  }

  return response.data.posts;
}
