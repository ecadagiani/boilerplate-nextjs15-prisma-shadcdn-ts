import { createPost } from "@/actions/post";
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
        action={createPost}
        submitText="Create"
        categories={categories.map((c) => ({value: c.id, label: c.name}))}
      />
    </DefaultLayout>
  );
}
