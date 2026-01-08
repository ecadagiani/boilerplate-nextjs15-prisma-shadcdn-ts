import BreadcrumbComponent from "@/components/breadcrumb-component";
import { getPost } from "@/lib/services/post";
import { notFound } from "next/navigation";

export default async function BreadcrumbSlot({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const post = await getPost({ slug });
    if (!post) {
      notFound();
    }

    return (
      <BreadcrumbComponent
        items={[
          { label: "Home", href: "/" },
          { label: "Posts", href: "/" },
        ]}
        current={post.title}
      />
    );
  } catch (_error) {
    console.error(_error);
    return notFound();
  }
}
