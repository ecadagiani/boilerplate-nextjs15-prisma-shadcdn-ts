import BreadcrumbComponent from "@/components/BreadcrumbComponent";
const BreadcrumbSlot = () => {
  return (
    <BreadcrumbComponent
      items={[{ label: "Home", href: "/" }]}
      current="Login"
    />
  );
};
export default BreadcrumbSlot;
