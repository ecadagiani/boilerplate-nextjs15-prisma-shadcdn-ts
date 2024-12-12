import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React, { memo } from "react";

export interface BreadcrumbComponentProps {
  items: {
    label: string
    href?: string
    component?: React.ReactNode
  }[]
  current?: string | React.ReactNode
};

const BreadcrumbComponent = memo(function BreadcrumbComponent({ items, current }: BreadcrumbComponentProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {(() => {
                if (item.component) return item.component;
                if (item.href) {
                  return (
                    <BreadcrumbLink asChild>
                      <Link href={item.href}>{item.label}</Link>
                    </BreadcrumbLink>
                  );
                }
                return <BreadcrumbPage>{item.label}</BreadcrumbPage>;
              })()}
            </BreadcrumbItem>
            {index < items.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
        {current && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{current}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
});

BreadcrumbComponent.displayName = "BreadcrumbComponent";

export default BreadcrumbComponent;
