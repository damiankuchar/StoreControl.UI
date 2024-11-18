import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "../ui/breadcrumb";

interface BreadcrumbNavigationProps {
  breadcrumbs?: string[];
}

const BreadcrumbNavigation = ({ breadcrumbs }: BreadcrumbNavigationProps) => {
  return breadcrumbs ? (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbPage>{breadcrumb}</BreadcrumbPage>
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 ? <BreadcrumbSeparator /> : null}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  ) : null;
};

export default BreadcrumbNavigation;
