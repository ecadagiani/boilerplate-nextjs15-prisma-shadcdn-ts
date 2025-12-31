import BreadcrumbComponent from "@/components/BreadcrumbComponent";
const BreadcrumbSlot = () => {
  return (
    <BreadcrumbComponent
      items={[{ label: "Home", href: "/" }]}
      current="My Account"
    />
  );
};
export default BreadcrumbSlot;
