import BreadcrumbComponent from "@/components/breadcrumb-component";
const BreadcrumbSlot = () => {
  return (
    <BreadcrumbComponent
      items={[{ label: "Home", href: "/" }]}
      current="My Posts"
    />
  );
};
export default BreadcrumbSlot;
