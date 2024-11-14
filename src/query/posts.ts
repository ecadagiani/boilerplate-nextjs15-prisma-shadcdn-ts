import api from "@/lib/api";
import type { PostWithRelations, PostWithRelationsAndExcerpt } from "@/types/posts";
import { excerptFromMarkdown } from "@/utils/string";
import BPromise from "bluebird";

export async function getPosts(sortOrder: 'desc' | 'asc' = 'desc'): Promise<PostWithRelationsAndExcerpt[]> {
  const response = await api.get('/post', {
    params: { sortOrder },
  });

  if (response.status !== 200) {
    throw new Error('Failed to fetch posts');
  }

  return BPromise.map(response.data.posts, async (post: PostWithRelations) => ({
    ...post,
    excerpt: await excerptFromMarkdown(post.content, 100),
  }));
}

export async function getPost(slug: string): Promise<PostWithRelations> {
  const response = await api.get(`/post/${slug}`);

  if (response.status !== 200) {
    throw new Error('Failed to fetch post');
  }

  return response.data.post;
}
