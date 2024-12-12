import BreadcrumbComponent from "@/components/BreadcrumbComponent";
export default function BreadcrumbSlot() {
  return (
    <BreadcrumbComponent
      items={[
        { label: "Home", href: "/" },
      ]}
      current="My Posts"
    />
  );
}
