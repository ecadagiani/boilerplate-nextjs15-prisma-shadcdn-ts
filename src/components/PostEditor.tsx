'use client';

import { ActionPostResult } from '@/actions/post';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { useWarnIfUnsavedChanges } from '@/hooks/useWarnIfUnsavedChanges';
import { PostWithRelations } from '@/lib/types/posts';
import { postSchema } from '@/lib/validation/post';
import { slugify } from '@/utils/string';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useTransition } from 'react';
import type { FormState } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { MultiSelect } from './ui/multi-select';

type PostSchemaInfer = z.infer<typeof postSchema>


type PostEditorProps = {
  action: (data: FormData) => Promise<ActionPostResult>
  post?: PostWithRelations
  submitText?: string
  categories?: {value: string, label: string}[]
}

type SubmitButtonProps = {
  formState: FormState<PostSchemaInfer>
  isPending: boolean
  submitText?: string
}

function SubmitButton({ formState, isPending=false, submitText = 'Save' }: SubmitButtonProps) {
  return (
    <Button 
      type="submit" 
      disabled={!formState.isDirty || !formState.isValid}
      className="
        rounded-lg
        bg-zinc-900 dark:bg-white 
        text-white dark:text-zinc-900
        hover:bg-zinc-800 dark:hover:bg-zinc-100
        transition-all duration-200
        disabled:opacity-50
      "
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Saving...
        </>
      ) : (
        submitText
      )}
    </Button>
  )
}

export default function PostEditor({action, post, submitText, categories }: PostEditorProps) {
  const [isPending, startTransition] = useTransition()

  const form = useForm<PostSchemaInfer>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      content: post?.content || '',
    },
    mode: "onChange",
    delayError: 500
  });

  // auto-generate slug from title
  const title = form.watch('title');
  const previousTitle = useRef(title);
  useEffect(() => {
    if(!previousTitle.current && !title) return; // avoid form.setValue on initial render

    const currentSlug = form.getValues('slug');
    const slugifiedPreviousTitle = slugify(previousTitle.current);
    if (!currentSlug || currentSlug === slugifiedPreviousTitle) {
      form.setValue('slug', slugify(title), {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
    
    previousTitle.current = title;
  }, [title, form]);

  // warn if there are unsaved changes
  useWarnIfUnsavedChanges(form.formState.isDirty);


  // submit form data to action
  async function onSubmit(data: PostSchemaInfer) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("slug", data.slug);
    formData.append("content", data.content);
    data.categories?.forEach((category) => {
      formData.append("categories", category);
    });

    startTransition(async () => {
      const result = await action(formData);
      if (result.ok) return; // todo redirect to preview
      if (result.errors) {
        if(typeof result.errors === 'string') {
          form.setError('root', { message: result.errors });
        } else {
          result.errors.forEach((error) => {
            form.setError(error.path, { message: error.message });
          });
        }
      }
    });
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="space-y-8 p-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
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
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="enter-post-slug" 
                      className="font-mono text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription >
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
                  <FormLabel >
                      Content (Markdown)
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

            <div className="flex justify-end gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <Button 
                type="button" 
                variant="outline"
                asChild
              >
                <Link href="/dashboard">Go back</Link>
              </Button>
              <SubmitButton isPending={isPending} formState={form.formState} submitText={submitText} />
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
        ">
          {/* Title Field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" /> {/* Label */}
            <Skeleton className="h-9 w-full" /> {/* Input */}
          </div>

          {/* Slug Field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" /> {/* Label */}
            <Skeleton className="h-9 w-full" /> {/* Input */}
            <Skeleton className="h-4 w-48" /> {/* Description */}
          </div>

          {/* Content Field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" /> {/* Label */}
            <Skeleton className="h-[150px] w-full" /> {/* Textarea */}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <Skeleton className="h-9 w-24" /> {/* Back button */}
            <Skeleton className="h-9 w-24" /> {/* Submit button */}
          </div>
        </Card>
      </div>
    </div>
  );
}