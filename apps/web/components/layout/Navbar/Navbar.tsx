import React from "react";
import Links from "./Links";
import TabList from "./TabList";
import Logo from "@/components/ui/Logo";

const Navbar = () => {
  return (
    <header className="container fixed left-0 right-0 top-0 z-[999] mx-auto grid h-20  px-3 backdrop-blur-md">
      <nav className="flex h-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo />
          <div className="hidden md:block">
            <h4 className="text-lg font-medium leading-tight">Marwan Hisham</h4>

            <div className="relative flex items-center">
              <div className="size-2 bg-green-500  rounded-full"></div>
              <div className="absolute size-2 bg-green-500 rounded-full animate-ping opacity-75"></div>
              <span className="ml-1 text-xs text-black/50 dark:text-white/50 ">
                Available for work
              </span>
            </div>
          </div>
        </div>
        <TabList
          tabs={[
            { title: "Work", href: "" },
            { title: "About", href: "about" },
            { title: "Blog", href: "blog" },
          ]}
        />

        <Links />
      </nav>
    </header>
  );
};

export default Navbar;
