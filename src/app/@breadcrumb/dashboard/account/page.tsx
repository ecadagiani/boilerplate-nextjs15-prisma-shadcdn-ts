import BreadcrumbComponent from "@/components/breadcrumb-component";
const BreadcrumbSlot = () => {
  return (
    <BreadcrumbComponent
      items={[{ label: "Home", href: "/" }]}
      current="My Account"
    />
  );
};
export default BreadcrumbSlot;
