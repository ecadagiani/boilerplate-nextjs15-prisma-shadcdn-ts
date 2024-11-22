import PostCard, { PostCardSkeleton } from '@/components/PostCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SortOrder } from '@/types/api';
import type { PostWithRelationsAndExcerpt } from '@/types/posts';
import { cn } from '@/utils/shadcn';

export type PostsListProps = {
  title: string;
  titleClassName?: string;
  description?: string;
  descriptionClassName?: string;
  onSortChange?: (sortOrder: SortOrder) => void;
  sortOrder?: SortOrder;
  posts?: PostWithRelationsAndExcerpt[];
  isLoading?: boolean;
  PostCardComponent?: React.ComponentType<PostWithRelationsAndExcerpt>;
  PostCardSkeletonComponent?: React.ComponentType;
}

export default function PostsList({
  title,
  titleClassName,
  description,
  descriptionClassName,
  onSortChange,
  sortOrder,
  posts,
  isLoading,
  PostCardComponent = PostCard,
  PostCardSkeletonComponent = PostCardSkeleton,
}: PostsListProps) {

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 pt-2">
      {/* Hero Section */}
      <div className="text-center space-y-8 mb-16">
        <h1 className={cn("text-5xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-6xl", titleClassName)}>
          {title}
        </h1>
        {description && (
          <p className={cn("text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto", descriptionClassName)}>
            {description}
          </p>
        )}
          
        {/* Sort Control */}
        {onSortChange && (
          <div className="flex justify-end max-w-4xl mx-auto">
            <Select
              value={sortOrder}
              onValueChange={(value: SortOrder) => onSortChange(value)}
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
        )}
      </div>
        
      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          Array.from({ length: (posts ?? []).length || 6 }).map((_, index) => (
            <div key={index} className="transform transition-all hover:-translate-y-1">
              <PostCardSkeletonComponent />
            </div>
          ))
        ) : (
          posts?.map((post) => (
            <div key={post.id} className="transform transition-all hover:-translate-y-1">
              <PostCardComponent key={post.id} {...post} />
            </div>
          ))
        )}
      </div>
    </main>
  );
}
