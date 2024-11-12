import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { memo } from 'react'

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
    <Card className="overflow-hidden">
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 text-sm space-y-4">
        <div className="space-y-1 text-muted-foreground">
          <p>{excerpt}</p>
          <p>By: {author.name || author.email}</p>
          <p>Categories: {categories.map(c => c.category.name).join(', ')}</p>
          <p>Published: {new Date(createdAt).toLocaleDateString()}</p>
        </div>
        <Button asChild variant="link" className="px-0">
          <Link href={`/post/${slug}`}>Read More →</Link>
        </Button>
      </CardContent>
    </Card>
  )
});

export default PostCard;