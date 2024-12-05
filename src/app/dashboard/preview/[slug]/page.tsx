import { auth } from "@/auth";
import DefaultLayout, { defaultTitleClassName } from "@/components/DefaultLayout";
import PostContent from "@/components/PostContent";
import { getPost } from "@/lib/services/post";
import { cn } from "@/utils/shadcn";
import { notFound } from "next/navigation";

export default async function PreviewPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  try {
    const session = await auth();
    const { slug } = await params;
    const post = await getPost({ slug });

    if (!post || post.authorId !== session?.user?.id) {
      notFound();
    }

    return (
      <DefaultLayout
        title={post.title}
        titleClassName={cn(defaultTitleClassName, "text-4xl sm:text-4xl")}
        className="max-w-3xl mx-auto py-8 px-4"
      >
        <PostContent {...post} isPreview />
      </DefaultLayout>
    );
  }
  catch {
    notFound();
  }
}
