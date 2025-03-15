import { type FC, ReactNode } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb";
import { cn } from "@workspace/ui/lib/utils"; // Assuming this is where your cn utility is imported from
import Link from "next/link";

// Define a type for each breadcrumb item
export type BreadcrumbItemType = {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
  className?: string;
};

export type BreadcrumbsProps = {
  items: BreadcrumbItemType[];
  className?: string;
  separatorClassName?: string;
  hideMobileItems?: boolean;
  separator?: ReactNode;
};

const Breadcrumbs: FC<BreadcrumbsProps> = ({
  items,
  className,
  separatorClassName,
  hideMobileItems = true,
  separator,
}) => {
  if (!items.length) return null;

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const mobileClass =
            hideMobileItems && !isLast ? "hidden md:block" : "";

          return (
            <div key={`breadcrumb-${index}`} className="flex items-center">
              <BreadcrumbItem className={cn(mobileClass, item.className)}>
                {item.isCurrentPage || isLast ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={item.href || "#"}>{item.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast && (
                <BreadcrumbSeparator
                  className={cn(
                    hideMobileItems ? "hidden md:block ml-2" : "",
                    separatorClassName
                  )}
                >
                  {separator}
                </BreadcrumbSeparator>
              )}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
