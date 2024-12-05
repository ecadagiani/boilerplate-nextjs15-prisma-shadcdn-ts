import DefaultLayout from "@/components/DefaultLayout";
import { PostEditorSkeleton } from "@/components/PostEditor";

export default async function NewPostPage() {
  return (
    <DefaultLayout
      title="New post"
    >
      <PostEditorSkeleton />
    </DefaultLayout>
  );
}
