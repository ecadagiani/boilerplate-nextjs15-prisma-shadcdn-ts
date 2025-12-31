import { auth } from "@/auth";
import DefaultLayout from "@/components/DefaultLayout";
import { getPosts } from "@/lib/services/post";
import type { SortOrder } from "@/lib/types/api";
import type { Session } from "next-auth";
import UserPostsList from "./UserPostsList";

const DashboardPage = async () => {
  const session = (await auth()) as Session;
  const initialSortOrder: SortOrder = "desc";
  const userPosts = await getPosts({
    userId: session?.user.id,
    sortOrder: initialSortOrder,
  });

  return (
    <DefaultLayout title="My posts">
      <UserPostsList
        session={session}
        initialPosts={userPosts}
        initialSortOrder={initialSortOrder}
      />
    </DefaultLayout>
  );
};
export default DashboardPage;
