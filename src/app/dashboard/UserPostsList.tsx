'use client';

import PostEditorCard, { PostEditorCardSkeleton } from "@/components/PostEditorCard";
import PostsList from "@/components/PostsList";
import { queryUserPosts } from "@/query/post";
import type { SortOrder } from "@/types/api";
import type { PostWithRelationsAndExcerpt } from "@/types/posts";
import { useQuery } from "@tanstack/react-query";
import { Session } from "next-auth";
import { useState } from "react";

export type DashboardPostsPageProps = {
  initialPosts: PostWithRelationsAndExcerpt[];
  initialSortOrder: SortOrder;
  session: Session;
}

function DashboardPostCard({
  ...props
}: PostWithRelationsAndExcerpt) {
  return <PostEditorCard {...props} />;
}

export default function UserPostsList({
  initialPosts,
  initialSortOrder,
  session
}: DashboardPostsPageProps) {
  const [sortOrder, setSortOrder] = useState<SortOrder>(initialSortOrder);
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts', sortOrder, session.user.id],
    queryFn: () => queryUserPosts({sortOrder, userId: session.user.id}),
    initialData: initialPosts,
  });


  return (
    <PostsList
      title="My posts"
      titleClassName="text-left"
      onSortChange={setSortOrder}
      sortOrder={sortOrder}
      posts={posts}
      isLoading={isLoading}
      PostCardComponent={DashboardPostCard}
      PostCardSkeletonComponent={PostEditorCardSkeleton}
    />
  );
}
