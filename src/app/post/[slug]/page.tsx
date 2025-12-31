import DefaultLayout, {
  defaultTitleClassName,
} from "@/components/DefaultLayout";
import PostContent from "@/components/PostContent";
import { getPost } from "@/lib/services/post";
import { cn } from "@/utils/shadcn";
import { notFound } from "next/navigation";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;
    const post = await getPost({ slug });

    if (!post || !post.published) {
      notFound();
    }

    return (
      <DefaultLayout
        title={post.title}
        titleClassName={cn(defaultTitleClassName, "text-4xl sm:text-4xl")}
        className="max-w-3xl mx-auto py-8 px-4"
      >
        <PostContent {...post} />
      </DefaultLayout>
    );
  } catch {
    notFound();
  }
}
