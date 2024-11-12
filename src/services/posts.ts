import api, { apiClient } from '@/lib/api';
import { excerptFromMarkdown } from '@/utils/string';
import type { Post } from '@prisma/client';
import BPromise from 'bluebird';

type PostWithRelations = Post & {
  author: {
    name: string | null;
    email: string;
  };
  categories: Array<{
    category: {
      name: string;
    };
  }>;
};

type PostWithExcerpt = PostWithRelations & {
  excerpt: string;
};

export async function getPosts(sortOrder: 'desc' | 'asc' = 'desc'): Promise<PostWithExcerpt[]> {
  const response = await apiClient.get('/post', {
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
