'use client';

import { deletePostAction } from "@/actions/post";
import type { PostEditorCardProps } from "@/components/PostEditorCard";
import PostEditorCard, { PostEditorCardSkeleton } from "@/components/PostEditorCard";
import PostsList from "@/components/PostsList";
import type { SortOrder } from "@/lib/types/api";
import type { PostWithRelationsAndExcerpt } from "@/lib/types/posts";
import { queryUserPosts } from "@/query/post";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Session } from "next-auth";
import { useCallback, useMemo, useState } from "react";

export interface DashboardPostsPageProps {
  initialPosts: PostWithRelationsAndExcerpt[];
  initialSortOrder: SortOrder;
  session: Session;
}

interface DashboardPostCardProps extends PostEditorCardProps {
  updateList: (postId: string) => void;
}

function DashboardPostCard({
  updateList,
  ...props
}: DashboardPostCardProps) {
  return <PostEditorCard {...props} updateList={updateList} actionDelete={deletePostAction} />;
}

export default function UserPostsList({
  initialPosts,
  initialSortOrder,
  session
}: DashboardPostsPageProps) {
  const queryClient = useQueryClient();
  const [sortOrder, setSortOrder] = useState<SortOrder>(initialSortOrder);
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts', sortOrder, session.user.id],
    queryFn: () => queryUserPosts({sortOrder, userId: session.user.id}),
    initialData: initialPosts,
  });

  const removePost = useCallback((postId: string) => {
    queryClient.setQueryData(
      ['posts', sortOrder, session.user.id],
      posts.filter((post) => post.id !== postId)
    );
  }, [posts, sortOrder, session.user.id, queryClient]);

  const postCardComponentProps = useMemo(() => ({ updateList: removePost }), [removePost]);

  return (
    <PostsList<{ updateList: (postId: string) => void }>
      onSortChange={setSortOrder}
      sortOrder={sortOrder}
      posts={posts}
      isLoading={isLoading}
      PostCardComponent={DashboardPostCard}
      PostCardSkeletonComponent={PostEditorCardSkeleton}
      additionalPostCardProps={postCardComponentProps}
    />
  );
}
