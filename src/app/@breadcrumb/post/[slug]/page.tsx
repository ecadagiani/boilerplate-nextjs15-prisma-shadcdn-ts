import BreadcrumbComponent from '@/components/BreadcrumbComponent';
import { getPost } from '@/query/posts';
import { notFound } from 'next/navigation';
export default async function BreadcrumbSlot({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  try {
    const post = await getPost(slug);
    return (
    <BreadcrumbComponent
      items={[
        { label: 'Home', href: '/' },
        { label: 'Posts', href: '/' }
      ]}
      current={post.title}
      />
    );
  } catch (_error) {
    console.error(_error);
    return notFound();
  }
}
