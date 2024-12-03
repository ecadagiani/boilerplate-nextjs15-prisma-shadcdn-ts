import DefaultLayout from '@/components/DefaultLayout';
import { getPost } from '@/lib/services/post';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const {slug} = await params;
    // used like this, the PostPage is a server component, it will be prerendered during next build to a static page
    const post = await getPost(slug);

    if (!post) {
      notFound();
    }

    return (
      <DefaultLayout 
        title={post.title} 
        titleClassName="tracking-tight text-zinc-900 dark:text-white text-4xl font-bold mb-4 text-left"
        className="max-w-3xl mx-auto py-8 px-4"
      >
        <header className="mb-8">
          <div className="text-sm text-muted-foreground space-y-1">
            <p>By: {post.author.name || post.author.email}</p>
            <p>
              Categories:{' '}
              {post.categories.map((c) => c.category.name).join(', ')}
            </p>
            <p>
              Published:{' '}
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </header>
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </DefaultLayout>
    );
  } catch (_error) {
    notFound();
  }
} 