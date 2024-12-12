import { cn } from "@/utils/shadcn";
import { memo } from "react";

export interface DefaultLayoutProps {
  className?: string
  title: string | React.ReactNode
  titleClassName?: string
  description?: string
  descriptionClassName?: string
  children: React.ReactNode
}

export const defaultTitleClassName = "text-5xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-6xl";
export const defaultDescriptionClassName = "text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto";
export default memo(function DefaultLayout({
  className,
  title,
  titleClassName = defaultTitleClassName,
  description,
  descriptionClassName = defaultDescriptionClassName,
  children,
}: DefaultLayoutProps) {
  return (
    <main className={cn("min-h-screen bg-white dark:bg-zinc-950 pt-4", className)}>
      <div className="text-left space-y-8 mb-16">
        <h1 className={titleClassName}>
          {title}
        </h1>
        {description && (
          <p className={descriptionClassName}>
            {description}
          </p>
        )}
      </div>
      {children}
    </main>
  );
});
