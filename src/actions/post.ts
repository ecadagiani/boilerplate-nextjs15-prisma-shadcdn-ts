"use server";

import { Role } from "@/generated/prisma/client";
import { actionWithAuth } from "@/lib/action-with-auth";
import {
  createPost,
  deletePost,
  getPost,
  setPublishStatus,
  updatePost,
} from "@/lib/services/post";
import type { ActionReturn } from "@/lib/types/action";
import type { Post } from "@/lib/types/posts";
import type { postSchema } from "@/lib/validation/post";
import { createPostServerSchema } from "@/lib/validation/post-server";
import { transformZodErrors } from "@/utils/validation";
import { z } from "zod";

type PostSchemaInfer = z.infer<typeof postSchema>;
type ActionPostResultErrors = {
  path: keyof PostSchemaInfer;
  message: string;
}[];

export type ActionCreatePostResult = ActionReturn<{
  errors?: string | ActionPostResultErrors;
  post?: Post;
}>;

export const createPostAction = actionWithAuth<
  [FormData],
  ActionCreatePostResult
>({ roles: [Role.USER, Role.ADMIN] }, async (session, formData) => {
  try {
    // validate the FormData
    const validatedFields = await createPostServerSchema().parseAsync({
      title: formData.get("title"),
      slug: formData.get("slug"),
      content: formData.get("content"),
      excerpt: formData.get("excerpt"),
      categories: formData.getAll("categories"),
    });

    const result = await createPost({
      authorId: session?.user.id,
      title: validatedFields.title,
      slug: validatedFields.slug,
      content: validatedFields.content,
      excerpt: validatedFields.excerpt,
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
});

export const updatePostAction = actionWithAuth<
  [string, FormData],
  ActionCreatePostResult
>({ roles: [Role.USER, Role.ADMIN] }, async (session, id, formData) => {
  try {
    // validate the FormData
    const validatedFields = await createPostServerSchema(id).parseAsync({
      title: formData.get("title"),
      slug: formData.get("slug"),
      content: formData.get("content"),
      excerpt: formData.get("excerpt"),
      categories: formData.getAll("categories"),
    });

    // Check if post exists and user owns it
    const existingPost = await getPost({ id });
    if (!existingPost) {
      return {
        ok: false,
        errors: "Post not found",
      };
    }

    // Check if user owns the post
    if (existingPost.author.id !== session.user.id) {
      return {
        ok: false,
        errors: "You do not have permission to update this post",
      };
    }

    const result = await updatePost({
      id: existingPost.id,
      title: validatedFields.title,
      slug: validatedFields.slug,
      content: validatedFields.content,
      excerpt: validatedFields.excerpt,
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
      errors: "An unexpected error occurred. Could not update post.",
    };
  }
});

export const deletePostAction = actionWithAuth<
  [string],
  ActionReturn<{ postId?: string; postTitle?: string }>
>({ roles: [Role.USER, Role.ADMIN] }, async (session, postId) => {
  try {
    // Check if post exists and user owns it
    const post = await getPost({ id: postId });
    if (!post) {
      return {
        ok: false,
        errors: "Post not found",
      };
    }

    // Check if user owns the post
    if (post.author.id !== session.user.id) {
      return {
        ok: false,
        errors: "You do not have permission to delete this post",
      };
    }

    // Delete the post
    const result = await deletePost(postId);

    return {
      ok: true,
      postId: result.id,
      postTitle: result.title,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      errors: "An unexpected error occurred. Could not delete post.",
    };
  }
});

export const setPublishStatusPostAction = actionWithAuth<
  [string, boolean],
  ActionReturn<{ post?: Post }>
>({ roles: [Role.USER, Role.ADMIN] }, async (session, postId, publish) => {
  try {
    // Check if post exists and user owns it
    const existingPost = await getPost({ id: postId });
    if (!existingPost) {
      return {
        ok: false,
        errors: "Post not found",
      };
    }

    // Check if user owns the post
    if (existingPost.author.id !== session.user.id) {
      return {
        ok: false,
        errors: "You do not have permission to update this post",
      };
    }

    const result = await setPublishStatus({
      id: existingPost.id,
      publish,
    });

    if (!result) {
      return {
        ok: false,
        errors:
          "An unexpected error occurred. Could not update publish status.",
      };
    }

    return {
      ok: true,
      post: result,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      errors: "An unexpected error occurred. Could not update publish status.",
    };
  }
});
