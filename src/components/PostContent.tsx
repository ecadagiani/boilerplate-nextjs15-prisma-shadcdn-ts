import { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import { Skeleton } from './ui/skeleton';

interface PostContentProps {
  content: string;
  author: {
    name: string | null;
    email: string;
  };
  categories: Array<{
    category: {
      name: string;
    };
  }>;
  published: Date | null;
  isPreview?: boolean;
}

const PostContent = memo(({
  content,
  author,
  categories,
  published,
  isPreview = false,
}: PostContentProps) => (
  <article>
    <header className="mb-8">
      <div className="text-sm text-muted-foreground space-y-1">
        <p>
          By:
          {author.name || author.email}
        </p>
        <p>
          Categories:
          {' '}
          {categories.map((c) => c.category.name).join(', ')}
        </p>
        {published && (
          <p>
            Published:
            {' '}
            {new Date(published).toLocaleDateString()}
          </p>
        )}
        {isPreview && (
          <p className="text-yellow-600 dark:text-yellow-400 font-medium">
            Preview Mode
          </p>
        )}
      </div>
    </header>
    <div className="prose prose-zinc dark:prose-invert max-w-none">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  </article>
));

export default PostContent;

export const PostContentSkeleton = memo(() => (
  <>
    <header className="mb-8">
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </header>
    <div className="space-y-4">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/5" />
    </div>
  </>
));
