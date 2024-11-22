import { auth } from "@/auth";
import { addPostsExcerpt, getPosts } from "@/services/post";
import type { SortOrder } from "@/types/api";
import type { Session } from "next-auth";
import UserPostsList from "./UserPostsList";

export default async function DashboardPage() {
  const session= await auth() as Session ;
  const initialSortOrder: SortOrder = 'desc';
  const userPosts = await getPosts({userId: session?.user.id, sortOrder: initialSortOrder});
  const userPostsExcerpt = await addPostsExcerpt(userPosts);
  
  return (
    <UserPostsList
      session={session}
      initialPosts={userPostsExcerpt}
      initialSortOrder={initialSortOrder}
    />
  );
}
