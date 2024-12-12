import BreadcrumbComponent from "@/components/BreadcrumbComponent";
import { Skeleton } from "@/components/ui/skeleton";
import { Paths } from "@/constants/paths";

export default async function BreadcrumbSlot() {
  return (
    <BreadcrumbComponent
      items={[
        { label: "Home", href: "/" },
        { label: "Dashboard", href: Paths.DASHBOARD },
      ]}
      current={<Skeleton className="h-4 w-[70px]" />}
    />
  );
}
