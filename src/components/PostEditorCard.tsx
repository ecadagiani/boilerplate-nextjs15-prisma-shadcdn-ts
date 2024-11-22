import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Paths } from '@/constants/paths'
import { Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { memo } from 'react'
import { PostCardProps } from './PostCard'


type PostEditorCardProps = PostCardProps & {
  createdAt: Date
  updatedAt: Date
  onDelete?: (slug: string) => void
}

const PostEditorCard = memo(function PostEditorCard({ 
  title, 
  author, 
  categories, 
  createdAt, 
  updatedAt,
  published,
  excerpt, 
  slug,
  onDelete 
}: PostEditorCardProps) {
  return (
    <Card className={`
      overflow-hidden h-full relative
      hover:shadow-lg transition-all duration-300
      ${published 
      ? 'bg-white dark:bg-zinc-800' 
      : 'bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-800'
    }
      border ${published 
      ? 'border-zinc-200 dark:border-zinc-700' 
      : 'border-dashed border-zinc-300 dark:border-zinc-600'
    }
    `}>

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
              className={!published ? 'bg-white dark:bg-zinc-800' : ''}
            >
                Preview
            </Button>
          </Link>
          <Link href={Paths.EDIT(slug)}>
            <Button 
              variant={published ? "outline" : "secondary"} 
              size="sm"
              className={!published ? 'bg-white dark:bg-zinc-800' : ''}
            >
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          <Button 
            variant={published ? "outline" : "secondary"}
            size="sm"
            className={`
                text-destructive hover:bg-destructive hover:text-destructive-foreground
                ${!published && 'bg-white dark:bg-zinc-800'}
              `}
            onClick={() => onDelete?.(slug)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        
        <CardTitle className={`
            text-lg font-semibold 
            ${published 
      ? 'text-zinc-900 dark:text-white' 
      : 'text-zinc-600 dark:text-zinc-300'
    }
          `}>
          {title}
        </CardTitle>


        {/* Badge */}
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge 
            variant={published ? 'default' : 'secondary'}
            className={`
              ${!published && `
                bg-white dark:bg-zinc-800
                border border-zinc-200 dark:border-zinc-700
                hover:bg-white dark:hover:bg-zinc-800
              `}
            `}
          >
            {published ? 'Published' : 'Draft'}
          </Badge>

          {categories.map((c) => (
            <Badge 
              key={c.category.name} 
              variant={published ? 'outline' : 'secondary'}
              className={!published ? 'bg-white dark:bg-zinc-800' : ''}
            >
              {c.category.name}
            </Badge>
          ))}
        </div>
      </CardHeader>


      <CardContent className="p-4 pt-0 text-sm space-y-4">
        <div className="space-y-2">
          <p className={`
            line-clamp-2
            ${published 
      ? 'text-zinc-600 dark:text-zinc-400' 
      : 'text-zinc-500 dark:text-zinc-500'
    }
          `}>
            {excerpt}
          </p>
          <div className="space-y-1 text-xs text-zinc-500 dark:text-zinc-500">
            <p>By: {author.name || author.email}</p>
            <p>Created: {new Date(createdAt).toLocaleDateString()}</p>
            <p>Updated: {new Date(updatedAt).toLocaleDateString()}</p>
            <p>Published: { published ? new Date(published).toLocaleDateString() : 'Not published'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
});

export default PostEditorCard;

export function PostEditorCardSkeleton() {
  return (
    <Card className="overflow-hidden h-full relative bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
      {/* Header */}
      <CardHeader className="p-4">
        {/* Actions */}
        <div className="flex gap-2 shrink-0 justify-end">
          <Skeleton className="h-8 w-16 rounded-md" /> {/* Preview button */}
          <Skeleton className="h-8 w-8 rounded-md" />  {/* Edit button */}
          <Skeleton className="h-8 w-8 rounded-md" />  {/* Delete button */}
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
            <Skeleton className="h-3 w-1/3" /> {/* Author */}
            <Skeleton className="h-3 w-1/4" /> {/* Created */}
            <Skeleton className="h-3 w-1/4" /> {/* Updated */}
            <Skeleton className="h-3 w-1/4" /> {/* Published */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}