import { getPost } from '@/services/posts';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const post = await getPost(params.slug);

    return (
      <article className="max-w-3xl mx-auto py-8 px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
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
      </article>
    );
  } catch (_error) {
    notFound();
  }
} 