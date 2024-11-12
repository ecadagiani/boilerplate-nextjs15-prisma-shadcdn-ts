'use client';

import PostCard from '@/components/PostCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getPosts } from '@/services/posts';
import { useCallback, useEffect, useState } from 'react';

type SortOrder = 'desc' | 'asc';

export default function Home() {
  const [posts, setPosts] = useState<Awaited<ReturnType<typeof getPosts>>>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const fetchPosts = useCallback(async (order: SortOrder) => {
    const fetchedPosts = await getPosts(order);
    setPosts(fetchedPosts);
  }, []);

  useEffect(() => {
    fetchPosts(sortOrder);
  }, [fetchPosts, sortOrder]);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold">Welcome to my Blog</h1>
          <div className="flex justify-end">
            <Select
              value={sortOrder}
              onValueChange={(value: SortOrder) => setSortOrder(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Newest</SelectItem>
                <SelectItem value="asc">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              {...post}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
