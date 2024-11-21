import api from "@/lib/api";
import type { User } from "@prisma/client";

export async function queryUser(email: string): Promise<User> {
  const response = await api.get('/user', {
    params: { email },
  });

  if (response.status !== 200) {
    throw new Error('Failed to fetch posts');
  }

  return response.data.user;
}