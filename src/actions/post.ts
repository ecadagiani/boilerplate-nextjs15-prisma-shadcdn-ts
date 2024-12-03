'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { postSchema } from "@/lib/validation/post";
import { transformZodErrors } from "@/utils/validation";
import type { Post } from "@prisma/client";
import { z } from "zod";

type PostSchemaInfer = z.infer<typeof postSchema>;
type ActionPostResultErrors = { path: keyof PostSchemaInfer; message: string }[];

export type ActionPostResult = {
  ok: boolean;
  errors?: string | ActionPostResultErrors;
  result?: Post;
}

export async function createPost(
  formData: FormData,
): Promise<ActionPostResult> {
  try {
    const session = await auth();
    // todo test if session is valid
    

    //validate the FormData
    const validatedFields = postSchema.parse({
      title: formData.get("title"),
      slug: formData.get("slug"),
      content: formData.get("content"),
      categories: formData.getAll("categories"),
    });


    // send validated data to database here
    const result = await prisma.post.create({
      data: {
        authorId: session?.user.id,
        title: validatedFields.title,
        slug: validatedFields.slug,
        content: validatedFields.content,
        categories: {
          create: validatedFields.categories?.map((categoryId) => ({
            category: {
              connect: { id: categoryId }
            }
          })),
        },
      },
    });

    return {
      ok: true,
      result,
    };
  } catch (error) {
    console.log({ error });
    if (error instanceof z.ZodError) {
      return {
        ok: false,
        errors: transformZodErrors(error) as ActionPostResultErrors,
      };
    }

    return {
      ok: false,
      errors: "An unexpected error occurred. Could not create post.",
    };
  }
}