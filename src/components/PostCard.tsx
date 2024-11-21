import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Paths } from '@/constants/paths'
import Link from 'next/link'
import { memo } from 'react'
import { Badge } from './ui/badge'

type PostCardProps = {
  title: string
  slug: string
  author: {
    name: string | null
    email: string
  }
  categories: Array<{
    category: {
      name: string
    }
  }>
  createdAt: Date
  excerpt: string
}

const PostCard = memo(function PostCard({ title, author, categories, createdAt, excerpt, slug }: PostCardProps) {
  return (
    <Link href={Paths.POST(slug)} className="block  [&_*]:cursor-pointer">
      <Card className="
        overflow-hidden h-full bg-white dark:bg-zinc-800
        border border-zinc-200 dark:border-zinc-700 
        hover:shadow-lg transition-shadow duration-300
      ">
        <CardHeader className="p-4">
          <CardTitle className="text-lg font-semibold text-zinc-900 dark:text-white">{title}</CardTitle>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <Badge key={c.category.name} variant='outline'>
                {c.category.name}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0 text-sm space-y-4">
          <div className="space-y-2 text-zinc-600 dark:text-zinc-400">
            <p className="line-clamp-3">
              {excerpt}
              {' '}
              <Button variant="link" className="px-0 inline">
                read more
              </Button>
            </p>
            <p>By: {author.name || author.email}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-500">
              Published: {new Date(createdAt).toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
});

export default PostCard;

export function PostCardSkeleton() {
  return (
    <Card className="overflow-hidden h-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
      <CardHeader className="p-4">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 text-sm space-y-4">
        <div className="space-y-2 text-zinc-600 dark:text-zinc-400">
          <div className="space-y-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </CardContent>
    </Card>
  );
}
