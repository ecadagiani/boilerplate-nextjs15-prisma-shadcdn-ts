import { createPostAction } from "@/actions/post";
import DefaultLayout from "@/components/DefaultLayout";
import PostEditor from "@/components/PostEditor";
import { getCategories } from "@/lib/services/categories";

export default async function NewPostPage() {
  const categories = await getCategories();

  return (
    <DefaultLayout
      title="New post"
    >
      <PostEditor
        action={createPostAction}
        submitText="Create"
        categories={categories.map(c => ({ value: c.id, label: c.name }))}
        redirectPathKey="EDIT"
      />
    </DefaultLayout>
  );
}
