'use client';

import PostCard, { PostCardSkeleton } from '@/components/PostCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getPosts } from '@/services/posts';
import { useCallback, useEffect, useState } from 'react';

type SortOrder = 'desc' | 'asc';

export default function Home() {
  const [posts, setPosts] = useState<Awaited<ReturnType<typeof getPosts>>>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPosts = useCallback(async (order: SortOrder) => {
    setLoading(true);
    const fetchedPosts = await getPosts(order);
    setPosts(fetchedPosts);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts(sortOrder);
  }, [fetchPosts, sortOrder]);

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 pt-2">
        {/* Hero Section */}
        <div className="text-center space-y-8 mb-16">
          <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
            Welcome to my Blog
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Explore my thoughts, ideas, and insights about technology, development, and beer making.
          </p>
          
          {/* Sort Control */}
          <div className="flex justify-end max-w-4xl mx-auto">
            <Select
              value={sortOrder}
              onValueChange={(value: SortOrder) => setSortOrder(value)}
            >
              <SelectTrigger className="w-[180px] bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Newest</SelectItem>
                <SelectItem value="asc">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: posts.length || 6 }).map((_, index) => (
              <div key={index} className="transform transition-all hover:-translate-y-1">
                <PostCardSkeleton />
              </div>
            ))
          ) : (
            posts.map((post) => (
              <div key={post.id} className="transform transition-all hover:-translate-y-1">
                <PostCard {...post} />
              </div>
            ))
          )}
        </div>
    </main>
  );
}
