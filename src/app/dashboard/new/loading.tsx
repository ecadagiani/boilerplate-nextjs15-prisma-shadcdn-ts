import DefaultLayout from "@/components/default-layout";
import { PostEditorSkeleton } from "@/components/post-editor";

const NewPostPage = async () => {
  return (
    <DefaultLayout title="New post">
      <PostEditorSkeleton />
    </DefaultLayout>
  );
};
export default NewPostPage;
