import BreadcrumbComponent from "@/components/breadcrumb-component";
import { Skeleton } from "@/components/ui/skeleton";
import { Paths } from "@/constants/paths";

const BreadcrumbSlot = async () => {
  return (
    <BreadcrumbComponent
      items={[
        { label: "Home", href: "/" },
        { label: "Dashboard", href: Paths.DASHBOARD },
      ]}
      current={<Skeleton className="h-4 w-[70px]" />}
    />
  );
};
export default BreadcrumbSlot;
