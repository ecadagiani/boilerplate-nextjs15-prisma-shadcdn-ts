import { internalServerError, jsonData } from '@/lib/apiResponse';
import { getPosts } from '@/services/post';
import type { PostWithRelations } from '@/types/posts';

export async function GET(
  request: Request
){
  try {
    const { searchParams } = new URL(request.url);
    const posts = await getPosts({ 
      published: true,
      sortOrder: searchParams.get('sortOrder') as 'asc' | 'desc' ?? undefined,
    });

    return jsonData<{posts: PostWithRelations[]}>({posts})
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return internalServerError()
  }
}