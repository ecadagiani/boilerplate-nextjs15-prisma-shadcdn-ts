import type { Post } from '@prisma/client';

export type PostWithRelations = Post & {
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

export type PostWithExcerpt = Post & {
  excerpt: string;
};

export type PostWithRelationsAndExcerpt = PostWithRelations & PostWithExcerpt;
