import BreadcrumbComponent from '@/components/BreadcrumbComponent';
export default function BreadcrumbSlot() {

  return (
    <BreadcrumbComponent
      items={[
        { label: 'Home', href: '/' },
        { label: 'My Posts', href: '/dashboard' },
      ]}
      current="New Post"
    />
  );
}