import BreadcrumbComponent from "@/components/BreadcrumbComponent";
import { Paths } from "@/constants/paths";
export default function BreadcrumbSlot() {
  return (
    <BreadcrumbComponent
      items={[
        { label: "Home", href: "/" },
        { label: "My Posts", href: Paths.DASHBOARD },
      ]}
      current="New Post"
    />
  );
}
