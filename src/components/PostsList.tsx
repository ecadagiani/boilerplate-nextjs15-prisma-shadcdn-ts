import PostCard, { PostCardSkeleton } from '@/components/PostCard';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { SortOrder } from '@/lib/types/api';
import type { PostWithRelationsAndExcerpt } from '@/lib/types/posts';

export interface PostsListProps<TAdditionalPostCardProps extends Record<string, unknown>> {
  onSortChange?: (sortOrder: SortOrder) => void;
  sortOrder?: SortOrder;
  posts?: PostWithRelationsAndExcerpt[];
  isLoading?: boolean;
  PostCardComponent?: React.ComponentType<PostWithRelationsAndExcerpt & TAdditionalPostCardProps>;
  PostCardSkeletonComponent?: React.ComponentType;
  additionalPostCardProps?: TAdditionalPostCardProps;
}

export default function PostsList<TAdditionalPostCardProps extends Record<string, unknown>>({
  onSortChange,
  sortOrder,
  posts,
  isLoading,
  PostCardComponent = PostCard,
  PostCardSkeletonComponent = PostCardSkeleton,
  additionalPostCardProps,
}: PostsListProps<TAdditionalPostCardProps>) {
  return (
    <>
      {/* Sort Control */}
      {onSortChange && (
        <div className="flex justify-end max-w-4xl mx-auto pb-4">
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
              <PostCardComponent {...additionalPostCardProps} {...post} />
            </div>
          ))
        )}
      </div>
    </>
  );
}
