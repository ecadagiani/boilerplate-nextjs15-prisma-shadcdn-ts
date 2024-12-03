import type { PostWithRelationsAndExcerpt } from "@/lib/types/posts";
import api from "@/query/axios";

export async function queryPosts({
  sortOrder = 'desc',
  userId = null,
}: {
  sortOrder?: 'desc' | 'asc';
  userId?: string | null;
}): Promise<PostWithRelationsAndExcerpt[]> {
  const response = await api.get<{ posts: PostWithRelationsAndExcerpt[] }>('/post', {
    params: { sortOrder, userId },
  });

  if (response.status !== 200) {
    throw new Error('Failed to fetch posts');
  }
  
  return response.data.posts;
}

export async function queryUserPosts({
  sortOrder = 'desc',
  userId = null,
}: {
  sortOrder?: 'desc' | 'asc';
  userId?: string | null;
}): Promise<PostWithRelationsAndExcerpt[]> {
  const response = await api.get<{ posts: PostWithRelationsAndExcerpt[] }>(`/user/${userId}/post`, {
    params: { sortOrder },
  });

  if (response.status !== 200) {
    throw new Error('Failed to fetch posts');
  }

  return response.data.posts;
}
