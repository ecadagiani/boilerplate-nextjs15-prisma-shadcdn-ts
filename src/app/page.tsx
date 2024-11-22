'use client';

import PostsList from '@/components/PostsList';
import { queryPosts } from '@/query/post';
import type { SortOrder } from '@/types/api';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';


export default function Home() {
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts', sortOrder],
    queryFn: () => queryPosts({sortOrder}),
  });


  return (
    <PostsList
      title="Welcome to my Blog"
      description="Explore my thoughts, ideas, and insights about technology, development, and beer making."
      onSortChange={setSortOrder}
      sortOrder={sortOrder}
      posts={posts}
      isLoading={isLoading}
    />
  );
}
