import BreadcrumbComponent from "@/components/BreadcrumbComponent";
const BreadcrumbSlot = () => {
  return (
    <BreadcrumbComponent
      items={[{ label: "Home", href: "/" }]}
      current="My Posts"
    />
  );
};
export default BreadcrumbSlot;
