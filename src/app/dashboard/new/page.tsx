import { createPostAction } from "@/actions/post";
import DefaultLayout from "@/components/default-layout";
import PostEditor from "@/components/post-editor";
import { getCategories } from "@/lib/services/categories";

const NewPostPage = async () => {
  const categories = await getCategories();

  return (
    <DefaultLayout title="New post">
      <PostEditor
        action={createPostAction}
        submitText="Create"
        categories={categories.map((c) => ({ value: c.id, label: c.name }))}
        redirectPathKey="EDIT"
      />
    </DefaultLayout>
  );
};
export default NewPostPage;
