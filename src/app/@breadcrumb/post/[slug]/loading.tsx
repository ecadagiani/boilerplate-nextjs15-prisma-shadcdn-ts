import BreadcrumbComponent from '@/components/BreadcrumbComponent';
import { Skeleton } from '@/components/ui/skeleton';

export default async function BreadcrumbSlot() {
  return (
    <BreadcrumbComponent
      items={[
        { label: 'Home', href: '/' },
        { label: 'Posts', href: '/' }
      ]}
      current={<Skeleton className="h-4 w-[70px]" />}
    />
  );
}