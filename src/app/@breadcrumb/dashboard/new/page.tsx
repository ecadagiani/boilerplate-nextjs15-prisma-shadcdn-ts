import BreadcrumbComponent from "@/components/BreadcrumbComponent";
import { Paths } from "@/constants/paths";
const BreadcrumbSlot = () => {
  return (
    <BreadcrumbComponent
      items={[
        { label: "Home", href: "/" },
        { label: "My Posts", href: Paths.DASHBOARD },
      ]}
      current="New Post"
    />
  );
};
export default BreadcrumbSlot;
