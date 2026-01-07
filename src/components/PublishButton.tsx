"use client";

import { setPublishStatusPostAction } from "@/actions/post";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface PublishButtonProps {
  postId: string;
  isPublished: boolean;
}

export const PublishButton = ({ postId, isPublished }: PublishButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  const handleClick = () => {
    startTransition(async () => {
      const result = await setPublishStatusPostAction(postId, !isPublished);

      if (result.ok) {
        toast({
          title: isPublished ? "Unpublished" : "Published",
          description: isPublished
            ? "Your post has been unpublished"
            : "Your post has been published",
        });
        router.refresh();
      } else {
        toast({
          title: "Error",
          description:
            typeof result.errors === "string"
              ? result.errors
              : "An unexpected error occurred",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Button
      type="button"
      variant={isPublished ? "outline" : "default"}
      onClick={handleClick}
      disabled={isPending}
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {isPublished ? "Unpublishing..." : "Publishing..."}
        </>
      ) : isPublished ? (
        "Unpublish"
      ) : (
        "Publish"
      )}
    </Button>
  );
};
