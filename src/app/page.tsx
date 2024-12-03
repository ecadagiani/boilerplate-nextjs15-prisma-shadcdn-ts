'use client';

import DefaultLayout, { defaultTitleClassName } from '@/components/DefaultLayout';
import PostsList from '@/components/PostsList';
import type { SortOrder } from '@/lib/types/api';
import { queryPosts } from '@/query/post';
import { cn } from '@/utils/shadcn';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';


export default function Home() {
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts', sortOrder],
    queryFn: () => queryPosts({sortOrder}),
  });


  return (
    <DefaultLayout
      title="Welcome to my Blog"
      titleClassName={cn("text-center", defaultTitleClassName)}
      description="Explore my thoughts, ideas, and insights about technology, development, and beer making."
    >
      <PostsList
        onSortChange={setSortOrder}
        sortOrder={sortOrder}
        posts={posts}
        isLoading={isLoading}
      />
    </DefaultLayout>
  );
}
