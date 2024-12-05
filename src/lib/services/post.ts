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
      ...(() => {
        if (published === null) return {};
        return published ? { published: { not: null } } : { published: null };
      })(),
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

export async function getPost({
  slug,
  id,
}: {
  slug?: string;
  id?: string;
}): Promise<PostWithRelations | null> {
  ensureServer('services/getPost');
  const post = await prisma.post.findUnique({
    where: { ...(slug ? { slug } : { id }) },
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

export async function createPost({
  authorId,
  title,
  slug,
  content,
  categories,
}: {
  authorId: string;
  title: string;
  slug: string;
  content: string;
  categories: string[] | undefined;
}) {
  ensureServer('services/createPost');

  const result = await prisma.post.create({
    data: {
      authorId,
      title,
      slug,
      content,
      categories: {
        create: categories?.map((categoryId) => ({
          category: {
            connect: { id: categoryId }
          }
        })),
      },
    },
  });
  return result;
}

export async function deletePost(id: string) {
  ensureServer('services/deletePost');
  return prisma.post.delete({ where: { id } });
}
