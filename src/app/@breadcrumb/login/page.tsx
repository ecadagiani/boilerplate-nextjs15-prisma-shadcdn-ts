import BreadcrumbComponent from "@/components/breadcrumb-component";
const BreadcrumbSlot = () => {
  return (
    <BreadcrumbComponent
      items={[{ label: "Home", href: "/" }]}
      current="Login"
    />
  );
};
export default BreadcrumbSlot;
