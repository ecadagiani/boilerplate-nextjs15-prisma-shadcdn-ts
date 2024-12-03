import prisma from "@/lib/prisma";
import { PostWithRelations, PostWithRelationsAndExcerpt } from "@/lib/types/posts";
import { ensureServer } from "@/utils/ensureRuntime";
import { excerptFromMarkdown } from "@/utils/string";
import BPromise from "bluebird";

export async function getPosts({
  userId = null,
  published = null,
  sortOrder = 'desc',
}: {
  userId?: string | null;
  published?: boolean | null;
  sortOrder?: 'asc' | 'desc';
}): Promise<PostWithRelationsAndExcerpt[]> {
  ensureServer('services/getPosts');
  const posts = await prisma.post.findMany({
    where: { 
      ...(userId ? { authorId: userId } : {}),
      ...(published !== null ? published ? { published: { not: null } } : { published: null } : {}),
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
      categories: {
        include: {
          category: true,
        },
      },
    },
    orderBy: {
      createdAt: sortOrder,
    },
    take: 20,
  });

  return BPromise.map(posts, async (post: PostWithRelations) => ({
    ...post,
    excerpt: await excerptFromMarkdown(post.content, 80),
  }));
}

export async function getPost(slug: string): Promise<PostWithRelations | null> {
  ensureServer('services/getPost');
  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      author: true,
      categories: {
        include: {
          category: true,
        },
      },
    },
  });

  return post;
}

