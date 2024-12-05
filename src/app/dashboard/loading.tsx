import DefaultLayout from "@/components/DefaultLayout";
import { PostEditorCardSkeleton } from "@/components/PostEditorCard";
import PostsList from "@/components/PostsList";

export default function DashboardLoadingPage() {
  return (
    <DefaultLayout
      title="My posts"
    >
      <PostsList
        isLoading={true}
        PostCardSkeletonComponent={PostEditorCardSkeleton}
      />
    </DefaultLayout>
  );
}
