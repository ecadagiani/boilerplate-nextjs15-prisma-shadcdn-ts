import PostCard, { PostCardSkeleton } from "@/components/PostCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SortOrder } from "@/lib/types/api";
import type { Post } from "@/lib/types/posts";

export interface AdditionalPostCardProps
  extends Post, Record<string, unknown> {}

export interface PostsListProps<T extends AdditionalPostCardProps> {
  onSortChange?: (sortOrder: SortOrder) => void;
  sortOrder?: SortOrder;
  posts?: Post[];
  isLoading?: boolean;
  PostCardComponent?: React.ComponentType<T>;
  PostCardSkeletonComponent?: React.ComponentType;
  additionalPostCardProps?: Omit<T, keyof Post>;
}

const PostsList = <T extends AdditionalPostCardProps>({
  onSortChange,
  sortOrder,
  posts,
  isLoading,
  PostCardComponent = PostCard as React.ComponentType<T>,
  PostCardSkeletonComponent = PostCardSkeleton,
  additionalPostCardProps = {} as Omit<T, keyof Post>,
}: PostsListProps<T>) => {
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
        {isLoading
          ? Array.from({ length: (posts ?? []).length || 6 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="transform transition-all hover:-translate-y-1"
                >
                  <PostCardSkeletonComponent />
                </div>
              ),
            )
          : posts?.map((post) => {
              const props = {
                ...additionalPostCardProps,
                ...post,
              } as T;

              return (
                <div
                  key={post.id}
                  className="transform transition-all hover:-translate-y-1"
                >
                  <PostCardComponent {...props} />
                </div>
              );
            })}
      </div>
    </>
  );
};
export default PostsList;
