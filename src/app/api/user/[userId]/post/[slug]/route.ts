import prisma from '@/lib/db';
import type { PostWithRelations } from '@/types/posts';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse<{ post: PostWithRelations | {error: string} }>> {
  try {
    const {slug} = await params;
    const post = await prisma.post.findUnique({
      where: {
        slug: slug,
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
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error('Failed to fetch post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
} 