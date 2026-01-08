import DefaultLayout from "@/components/default-layout";
import { PostContentSkeleton } from "@/components/post-content";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingPreviewPost = () => {
  return (
    <DefaultLayout
      title={<Skeleton className="h-8 w-2/3" />}
      className="max-w-3xl mx-auto py-8 px-4"
    >
      <PostContentSkeleton />
    </DefaultLayout>
  );
};
export default LoadingPreviewPost;
