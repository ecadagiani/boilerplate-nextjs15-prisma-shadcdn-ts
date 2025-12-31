import DefaultLayout from "@/components/DefaultLayout";
import { PostEditorSkeleton } from "@/components/PostEditor";

const NewPostPage = async () => {
  return (
    <DefaultLayout title="New post">
      <PostEditorSkeleton />
    </DefaultLayout>
  );
};
export default NewPostPage;
