import { Separator } from "@workspace/ui/components/separator";
import { SidebarTrigger } from "@workspace/ui/components/sidebar";
import { type FC } from "react";
import Breadcrumbs, { BreadcrumbItemType } from "../ui/Breadcumbs";
import ThemeToggle from "../theme/ThemeToggle";

type NavbarProps = {
  items: BreadcrumbItemType[];
};

const Navbar: FC<NavbarProps> = ({ items }) => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 justify-between mb-6">
      <div className="flex items-center gap-2 ">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumbs items={items} />
      </div>
      <ThemeToggle />
    </header>
  );
};

export default Navbar;
