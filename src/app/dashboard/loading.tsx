import DefaultLayout from "@/components/default-layout";
import { PostEditorCardSkeleton } from "@/components/post-editor-card";
import PostsList from "@/components/posts-list";

const DashboardLoadingPage = () => {
  return (
    <DefaultLayout title="My posts">
      <PostsList
        isLoading={true}
        PostCardSkeletonComponent={PostEditorCardSkeleton}
      />
    </DefaultLayout>
  );
};
export default DashboardLoadingPage;
