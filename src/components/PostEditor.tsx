"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRootError,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Paths } from "@/constants/paths";
import { EXCERPT_MAX_LENGTH, EXCERPT_RECOMMENDED_LENGTH } from "@/constants/post";
import { useToast } from "@/hooks/use-toast";
import { useIsDirty } from "@/hooks/useIsDirty";
import { useWarnIfUnsavedChanges } from "@/hooks/useWarnIfUnsavedChanges";
import { ActionReturn } from "@/lib/types/action";
import { Post } from "@/lib/types/posts";
import { postSchema } from "@/lib/validation/post";
import { excerptFromMarkdown, slugify } from "@/utils/string";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDeferredValue, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MultiSelect } from "./ui/multi-select";

// this file need to be splitted, and move post domain logic to a specific hook
// but as this rest is only as an example of a form, this file is a good start

type PostSchemaInfer = z.infer<typeof postSchema>;

export interface PostEditorProps {
  action: (data: FormData) => Promise<ActionReturn<{ post?: Post }>>
  post?: Post
  submitText?: string
  categories?: { value: string, label: string }[]
  redirectPathKey?: keyof typeof Paths
  redirectReplace?: boolean
}

export interface SubmitButtonProps {
  isDisabled: boolean
  isPending: boolean
  submitText?: string
}

function SubmitButton({ isDisabled = false, isPending = false, submitText = "Save" }: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={isDisabled}
      className="
        rounded-lg
        bg-zinc-900 dark:bg-white
        text-white dark:text-zinc-900
        hover:bg-zinc-800 dark:hover:bg-zinc-100
        transition-all duration-200
        disabled:opacity-50
      "
    >
      {isPending
        ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        )
        : (
          submitText
        )}
    </Button>
  );
}

export default function PostEditor({
  action, post, submitText, categories, redirectPathKey, redirectReplace = false,
}: PostEditorProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<PostSchemaInfer>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      excerpt: post?.excerpt || "",
      categories: post?.categories.map(category => category.id) || [],
    },
    mode: "onChange",
    delayError: 500,
  });

  const isDirty = useIsDirty(form, { falseOnSubmit: true });

  // warn if there are unsaved changes
  useWarnIfUnsavedChanges(isDirty);

  // auto-generate slug from title
  const title = form.watch("title");
  const previousTitle = useDeferredValue(title);
  useEffect(() => {
    if (!previousTitle && !title) return; // avoid form.setValue on initial render

    const currentSlug = form.getValues("slug");
    const slugifiedPreviousTitle = slugify(previousTitle);
    if (!currentSlug || currentSlug === slugifiedPreviousTitle) {
      form.setValue("slug", slugify(title));
    }
  }, [title, previousTitle, form]);

  // auto-generate excerpt from content
  const content = form.watch("content");
  const previousContent = useDeferredValue(content);
  useEffect(() => {
    if (!previousContent && !content) return; // avoid form.setValue on initial render

    (async () => {
      const currentExcerpt = form.getValues("excerpt");
      const excerptFromPreviousContent = await excerptFromMarkdown(previousContent, EXCERPT_RECOMMENDED_LENGTH);
      if (currentExcerpt === excerptFromPreviousContent) {
        const newExcerpt = await excerptFromMarkdown(content, EXCERPT_RECOMMENDED_LENGTH);
        form.setValue("excerpt", newExcerpt);
      }
    })();
  }, [content, previousContent, form]);

  // submit form data to action
  async function onSubmit(data: PostSchemaInfer) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("slug", data.slug);
    formData.append("content", data.content);
    formData.append("excerpt", data.excerpt || "");
    data.categories?.forEach((category) => {
      formData.append("categories", category);
    });

    if (post && post.id) {
      formData.append("id", post.id);
    }

    startTransition(async () => {
      const result = await action(formData);
      if (result.ok && result.post) {
        if (redirectPathKey) {
          if (!(redirectPathKey in Paths) || typeof Paths[redirectPathKey] !== "function")
            throw new Error(`Invalid redirectPathKey: ${redirectPathKey}`);

          if (redirectReplace)
            router.replace(Paths[redirectPathKey](result.post.slug));
          else
            router.push(Paths[redirectPathKey](result.post.slug));
        }
        else {
          form.reset({
            title: result.post.title,
            slug: result.post.slug,
            content: result.post.content,
            excerpt: result.post.excerpt,
            categories: result.post.categories.map(category => category.id),
          });
        }
        toast({
          title: "Saved",
          description: "Your post has been saved successfully",
        });
        return;
      }

      if (result.errors) {
        if (typeof result.errors === "string") {
          form.setError("root", { message: result.errors });
        }
        else {
          result.errors.forEach((error) => {
            if (typeof error === "string") {
              form.setError("root", { message: error });
            }
            else if (typeof error === "object" && "path" in error && "message" in error) {
              form.setError(error.path as keyof PostSchemaInfer, { message: error.message });
            }
          });
        }
      }
    });
  }

  return (
    <div className="max-w-4xl mx-auto pb-8">
      <Card className="p-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel aria-required>Title*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter post title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel aria-required>Slug*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter-post-slug"
                      className="font-mono text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The URL-friendly version of the title
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={categories || []}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel aria-required>
                    Content (Markdown)*
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your post content in markdown..."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel aria-required>
                    Excerpt
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your post excerpt..."
                      className="min-h-[60px]"
                      maxLength={EXCERPT_MAX_LENGTH}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormRootError className="mt-4" align="right" />
            <div className="flex justify-end gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <Button
                type="button"
                variant="outline"
                asChild
              >
                <Link href="/dashboard">Go back</Link>
              </Button>
              <SubmitButton
                isPending={isPending}
                isDisabled={!isDirty || !form.formState.isValid}
                submitText={submitText}
              />
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}

export function PostEditorSkeleton() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        <Card className="
          space-y-8 p-8
          bg-white dark:bg-zinc-900
          border border-zinc-200 dark:border-zinc-800
          rounded-xl
          shadow-lg dark:shadow-zinc-950/50
        "
        >
          {/* Title Field */}
          <div className="space-y-2">
            {/* Label */}
            <Skeleton className="h-4 w-16" />
            {/* Input */}
            <Skeleton className="h-9 w-full" />
          </div>

          {/* Slug Field */}
          <div className="space-y-2">
            {/* Label */}
            <Skeleton className="h-4 w-16" />
            {/* Input */}
            <Skeleton className="h-9 w-full" />
            {/* Description */}
            <Skeleton className="h-4 w-48" />
          </div>

          {/* Content Field */}
          <div className="space-y-2">
            {/* Label */}
            <Skeleton className="h-4 w-32" />
            {/* Textarea */}
            <Skeleton className="h-[150px] w-full" />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            {/* Back button */}
            <Skeleton className="h-9 w-24" />
            {/* Submit button */}
            <Skeleton className="h-9 w-24" />
          </div>
        </Card>
      </div>
    </div>
  );
}
