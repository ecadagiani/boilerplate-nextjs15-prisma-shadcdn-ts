'use server';

import { actionWithAuth } from "@/lib/actionWithAuth";
import { createPost, deletePost, getPost } from "@/lib/services/post";
import type { ActionReturn } from "@/lib/types/action";
import { postSchema } from "@/lib/validation/post";
import { transformZodErrors } from "@/utils/validation";
import { Role, type Post } from "@prisma/client";
import { z } from "zod";

type PostSchemaInfer = z.infer<typeof postSchema>;
type ActionPostResultErrors = { path: keyof PostSchemaInfer; message: string }[];

export type ActionPostResult = ActionReturn<{
  errors?: string | ActionPostResultErrors;
  post?: Post;
}>;

export const createPostAction = actionWithAuth<[FormData], ActionPostResult>(
  { roles: Role.USER },
  async (session, formData) => {
    try {
    // validate the FormData
      const validatedFields = postSchema.parse({
        title: formData.get("title"),
        slug: formData.get("slug"),
        content: formData.get("content"),
        categories: formData.getAll("categories"),
      });

      const result = await createPost({
        authorId: session?.user.id,
        title: validatedFields.title,
        slug: validatedFields.slug,
        content: validatedFields.content,
        categories: validatedFields.categories,
      });

      return {
        ok: true,
        post: result,
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          ok: false,
          errors: transformZodErrors(error) as ActionPostResultErrors,
        };
      }

      console.error(error);
      return {
        ok: false,
        errors: "An unexpected error occurred. Could not create post.",
      };
    }
  }
);

export const deletePostAction = actionWithAuth<[string], ActionReturn<{ post?: Post }>>(
  { roles: Role.USER },
  async (session, postId) => {
    try {
      // Check if post exists and user owns it
      const post = await getPost({ id: postId });
      if (!post) {
        return {
          ok: false,
          errors: "Post not found"
        };
      }
      if (post.authorId !== session.user.id) {
        return {
          ok: false,
          errors: "You do not have permission to delete this post",
        };
      }

      // Delete the post
      const result = await deletePost(postId);

      return {
        ok: true,
        post: result
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        errors: "An unexpected error occurred. Could not delete post."
      };
    }
  }
);
