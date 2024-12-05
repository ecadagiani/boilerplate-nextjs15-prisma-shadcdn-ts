import DefaultLayout from '@/components/DefaultLayout';
import { PostContentSkeleton } from '@/components/PostContent';
import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingPreviewPost() {
  return (
    <DefaultLayout
      title={<Skeleton className="h-8 w-2/3" />}
      className="max-w-3xl mx-auto py-8 px-4"
    >
      <PostContentSkeleton />
    </DefaultLayout>
  );
} 