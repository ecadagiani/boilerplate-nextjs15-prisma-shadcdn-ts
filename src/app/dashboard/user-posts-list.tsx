"use client";

import { deletePostAction } from "@/actions/post";
import type { PostEditorCardProps } from "@/components/post-editor-card";
import PostEditorCard, {
  PostEditorCardSkeleton,
} from "@/components/post-editor-card";
import type { AdditionalPostCardProps } from "@/components/posts-list";
import PostsList from "@/components/posts-list";
import type { SortOrder } from "@/lib/types/api";
import type { Post } from "@/lib/types/posts";
import { queryUserPosts } from "@/query/post";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Session } from "next-auth";
import { useState } from "react";

export interface DashboardPostsPageProps {
  initialPosts: Post[];
  initialSortOrder: SortOrder;
  session: Session;
}

interface DashboardPostCardProps
  extends AdditionalPostCardProps, Pick<PostEditorCardProps, "updateList"> {}

const DashboardPostCard = ({
  updateList,
  ...props
}: DashboardPostCardProps) => {
  return (
    <PostEditorCard
      {...props}
      updateList={updateList}
      actionDelete={deletePostAction}
    />
  );
};

const UserPostsList = ({
  initialPosts,
  initialSortOrder,
  session,
}: DashboardPostsPageProps) => {
  const queryClient = useQueryClient();
  const [sortOrder, setSortOrder] = useState<SortOrder>(initialSortOrder);
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts", sortOrder, session.user.id],
    queryFn: () => queryUserPosts({ sortOrder, userId: session.user.id }),
    initialData: initialPosts,
  });

  const removePost = (postId: string) => {
    queryClient.setQueryData(
      ["posts", sortOrder, session.user.id],
      posts.filter((post) => post.id !== postId),
    );
  };

  return (
    <PostsList
      onSortChange={setSortOrder}
      sortOrder={sortOrder}
      posts={posts}
      isLoading={isLoading}
      PostCardComponent={DashboardPostCard}
      PostCardSkeletonComponent={PostEditorCardSkeleton}
      additionalPostCardProps={{ updateList: removePost }}
    />
  );
};
export default UserPostsList;
