import DefaultLayout from "@/components/default-layout";
import { PostEditorSkeleton } from "@/components/post-editor";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingEditPost = async () => {
  return (
    <DefaultLayout title={<Skeleton className="h-8 w-2/3" />}>
      <PostEditorSkeleton />
    </DefaultLayout>
  );
};
export default LoadingEditPost;
