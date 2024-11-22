import api from "@/lib/api";
import { addPostsExcerpt } from "@/services/post";
import type { PostWithRelationsAndExcerpt } from "@/types/posts";

export async function queryPosts({
  sortOrder = 'desc',
  userId = null,
}: {
  sortOrder?: 'desc' | 'asc';
  userId?: string | null;
}): Promise<PostWithRelationsAndExcerpt[]> {
  const response = await api.get('/post', {
    params: { sortOrder, userId },
  });

  if (response.status !== 200) {
    throw new Error('Failed to fetch posts');
  }
  
  return addPostsExcerpt(response.data.posts);
}

export async function queryUserPosts({
  sortOrder = 'desc',
  userId = null,
}: {
  sortOrder?: 'desc' | 'asc';
  userId?: string | null;
}): Promise<PostWithRelationsAndExcerpt[]> {
  const response = await api.get(`/user/${userId}/post`, {
    params: { sortOrder },
  });

  if (response.status !== 200) {
    throw new Error('Failed to fetch posts');
  }

  return addPostsExcerpt(response.data.posts);
}
