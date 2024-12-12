"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Paths } from "@/constants/paths";
import { cn } from "@/utils/shadcn";
import { Edit, Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import { memo, useTransition } from "react";
import DateDisplay from "./DateDisplay";
import { PostCardProps } from "./PostCard";

export interface PostEditorCardProps extends PostCardProps {
  id: string
  createdAt: Date
  updatedAt: Date
  actionDelete: (id: string) => Promise<{ ok: boolean, postId?: string }>
  updateList: (postId: string) => void
}

interface ButtonDeleteProps {
  onDelete: () => void
  isPublished: boolean
  isPending: boolean
}

const ButtonDelete = memo(function ButtonDelete({
  onDelete,
  isPublished,
  isPending,
}: ButtonDeleteProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={isPublished ? "outline" : "secondary"}
          size="sm"
          className={`
            text-destructive hover:bg-destructive hover:text-destructive-foreground
            ${!isPublished && "bg-white dark:bg-zinc-800"}
          `}
          disabled={isPending}
        >
          {isPending
            ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            )
            : (
              <Trash2 className="h-4 w-4" />
            )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Post</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this post? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete} className="bg-destructive hover:bg-destructive/90">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});

const PostEditorCard = memo(function PostEditorCard({
  id,
  title,
  author,
  categories,
  createdAt,
  updatedAt,
  published,
  excerpt,
  slug,
  actionDelete,
  updateList,
}: PostEditorCardProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (actionDelete) {
      startTransition(async () => {
        console.log("actionDelete", actionDelete, id);
        const result = await actionDelete(id);
        console.log("actionDelete result", result);
        if (result.ok && result.postId) {
          console.log("actionDelete updateList result.post.id", result.postId);
          updateList(result.postId);
        }
      });
    }
  };

  return (
    <Card
      className={cn(
        "overflow-hidden h-full relative",
        "hover:shadow-lg transition-all duration-300",
        published
          ? "bg-white dark:bg-zinc-800"
          : "bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-800",
        "border",
        published
          ? "border-zinc-200 dark:border-zinc-700"
          : "border-dashed border-zinc-300 dark:border-zinc-600",
      )}
    >
      {/* Draft Badge */}
      {!published && (
        <div className="absolute top-3 left-3 -rotate-12">
          <Badge
            variant="secondary"
            className="
              font-mono text-xs bg-zinc-100 dark:bg-zinc-800
              border border-zinc-200 dark:border-zinc-700
              text-zinc-500 dark:text-zinc-400
            "
          >
            DRAFT
          </Badge>
        </div>
      )}

      {/* Header */}
      <CardHeader className="p-4">
        {/* Actions */}
        <div className="flex gap-2 shrink-0 justify-end">
          <Link href={Paths.PREVIEW(slug)} target="_blank">
            <Button
              variant={published ? "outline" : "secondary"}
              size="sm"
              className={!published ? "bg-white dark:bg-zinc-800" : ""}
              disabled={isPending}
            >
              Preview
            </Button>
          </Link>
          <Link href={Paths.EDIT(slug)}>
            <Button
              variant={published ? "outline" : "secondary"}
              size="sm"
              className={!published ? "bg-white dark:bg-zinc-800" : ""}
              disabled={isPending}
            >
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          <ButtonDelete
            onDelete={handleDelete}
            isPublished={!!published}
            isPending={isPending}
          />
        </div>

        <CardTitle className={`
            text-lg font-semibold 
            ${published
      ? "text-zinc-900 dark:text-white"
      : "text-zinc-600 dark:text-zinc-300"
    }
          `}
        >
          {title}
        </CardTitle>

        {/* Badge */}
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge
            variant={published ? "default" : "secondary"}
            className={cn(!published && `
                bg-white dark:bg-zinc-800
                border border-zinc-200 dark:border-zinc-700
                hover:bg-white dark:hover:bg-zinc-800
              `)}
          >
            {published ? "Published" : "Draft"}
          </Badge>

          {categories.map(c => (
            <Badge
              key={c.name}
              variant={published ? "outline" : "secondary"}
              className={!published ? "bg-white dark:bg-zinc-800" : ""}
            >
              {c.name}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0 text-sm space-y-4">
        <div className="space-y-2">
          <p className={cn(
            "line-clamp-2",
            published
              ? "text-zinc-600 dark:text-zinc-400"
              : "text-zinc-500 dark:text-zinc-500",
          )}
          >
            {excerpt}
          </p>
          <div className="space-y-1 text-xs text-zinc-500 dark:text-zinc-500">
            <p>
              By:
              {author.name || author.email}
            </p>
            <p>
              Created:
              <DateDisplay date={createdAt} />
            </p>
            <p>
              Updated:
              <DateDisplay date={updatedAt} />
            </p>
            <p>
              Published:
              {published ? <DateDisplay date={published} /> : "Not published"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

export default PostEditorCard;

export function PostEditorCardSkeleton() {
  return (
    <Card className="overflow-hidden h-full relative bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
      {/* Header */}
      <CardHeader className="p-4">
        {/* Actions */}
        <div className="flex gap-2 shrink-0 justify-end">
          <Skeleton className="h-8 w-16 rounded-md" />
          {/* Preview button */}
          <Skeleton className="h-8 w-8 rounded-md" />
          {/* Edit button */}
          <Skeleton className="h-8 w-8 rounded-md" />
          {/* Delete button */}
        </div>

        <CardTitle className="text-lg font-semibold">
          <Skeleton className="h-6 w-3/4" />
        </CardTitle>

        {/* Badge */}
        <div className="flex flex-wrap gap-2 mt-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0 text-sm space-y-4">
        <div className="space-y-2">
          {/* Excerpt */}
          <div className="space-y-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          {/* Metadata */}
          <div className="space-y-1">
            <Skeleton className="h-3 w-1/3" />
            {/* Author */}
            <Skeleton className="h-3 w-1/4" />
            {/* Created */}
            <Skeleton className="h-3 w-1/4" />
            {/* Updated */}
            <Skeleton className="h-3 w-1/4" />
            {/* Published */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
