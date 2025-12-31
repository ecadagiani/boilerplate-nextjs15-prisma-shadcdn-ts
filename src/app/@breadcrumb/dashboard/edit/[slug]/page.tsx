import BreadcrumbComponent from "@/components/BreadcrumbComponent";
import { Paths } from "@/constants/paths";
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
          { label: "Dashboard", href: Paths.DASHBOARD },
          { label: "Edit" },
        ]}
        current={post.title}
      />
    );
  } catch (_error) {
    console.error(_error);
    return notFound();
  }
}
