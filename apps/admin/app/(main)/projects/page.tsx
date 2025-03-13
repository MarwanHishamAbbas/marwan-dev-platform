import Navbar from "@/components/layout/Navbar";
import Breadcrumbs from "@/components/ui/Breadcumbs";
import { type FC } from "react";

type PageProps = {};

const Page: FC<PageProps> = ({}) => {
  return (
    <>
      <Navbar
        items={[
          {
            label: "Dashboard",
            href: "/",
          },
          { label: "Projects", href: "/dashboard/projects" },
        ]}
      />
    </>
  );
};

export default Page;
