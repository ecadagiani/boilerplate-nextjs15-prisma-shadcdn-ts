import { updatePostAction } from "@/actions/post";
import { auth } from "@/auth";
import DefaultLayout from "@/components/DefaultLayout";
import PostEditor from "@/components/PostEditor";
import { getCategories } from "@/lib/services/categories";
import { getPost } from "@/lib/services/post";
import { notFound } from "next/navigation";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const session = await auth();
  const categories = await getCategories();
  const { slug } = await params;
  const post = await getPost({ slug });

  if (!post || post.author?.id !== session?.user?.id) {
    notFound();
  }

  return (
    <DefaultLayout
      title="Update post"
      description={`Update post: "${post.title}"`}
    >
      <PostEditor
        action={async (formData) => {
          "use server";
          return updatePostAction(post.id, formData);
        }}
        submitText="Update"
        post={post}
        categories={categories.map(c => ({ value: c.id, label: c.name }))}
        redirectPathKey="EDIT"
        redirectReplace={true}
      />
    </DefaultLayout>
  );
}
