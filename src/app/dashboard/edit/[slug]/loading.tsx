import DefaultLayout from "@/components/DefaultLayout";
import { PostEditorSkeleton } from "@/components/PostEditor";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingEditPost = async () => {
  return (
    <DefaultLayout title={<Skeleton className="h-8 w-2/3" />}>
      <PostEditorSkeleton />
    </DefaultLayout>
  );
};
export default LoadingEditPost;
