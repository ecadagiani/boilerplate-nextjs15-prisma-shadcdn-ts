import { PostEditorCardSkeleton } from "@/components/PostEditorCard";
import PostsList from "@/components/PostsList";

export default function DashboardLoadingPage() {
  return (
    <PostsList
      title="My posts"
      isLoading={true}
      PostCardSkeletonComponent={PostEditorCardSkeleton}
    />
  );
}
