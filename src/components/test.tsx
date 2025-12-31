import type { ComponentType } from "react";

interface SimpleCardProps {
  name: string;
}

export const SimpleCard = ({ name }: SimpleCardProps) => {
  return (
    <div>
      Name:
      {name}
    </div>
  );
};

interface ComplexCardProps {
  name: string;
  category: string;
}

export const ComplexCard = ({ name, category }: ComplexCardProps) => {
  return (
    <div>
      Name: {name}, Category: {category}
    </div>
  );
};

interface Item {
  name: string;
}

interface CardComponentProps {
  name: string;
}

interface ListProps<T extends CardComponentProps> {
  items: Item[];
  CardComponent?: ComponentType<T>;
  additionalCardProps?: Omit<T, "name">;
}

export const List = <T extends CardComponentProps>({
  items,
  CardComponent = SimpleCard as ComponentType<T>,
  additionalCardProps = {} as Omit<T, "name">,
}: ListProps<T>) => {
  return (
    <div>
      {items.map((item, index) => {
        const props = {
          ...additionalCardProps,
          name: item.name,
        } as T;

        return <CardComponent key={index} {...props} />;
      })}
    </div>
  );
};
