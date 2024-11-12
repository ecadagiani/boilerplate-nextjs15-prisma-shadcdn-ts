import { Skeleton } from '@/components/ui/skeleton';

export default function PostPageLoading() {
  return (
    <article className="max-w-3xl mx-auto py-8 px-4">
      <header className="mb-8">
        <Skeleton className="h-8 w-1/2 mb-4" />
        <div className="text-sm text-muted-foreground space-y-1">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/5" />
        </div>
      </header>
      <div className="prose prose-zinc dark:prose-invert max-w-none space-y-2">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
    </article>
  );
} 