"use client";

import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const TabList: React.FC<{ tabs: { title: string; href: string }[] }> = ({
  tabs,
}) => {
  const pathname = usePathname();
  const fired = useRef(false);
  const defaultSelectedTabIndex =
    tabs.findIndex((tab) => pathname === `/${tab.href}`) || 0;
  const [currentLink, setCurrentLink] = useState<{
    index: number;
    left: undefined | number;
    width: undefined | number;
  }>({
    index: defaultSelectedTabIndex,
    left: undefined,
    width: undefined,
  });

  // Apply styles for the default selected tab
  const defaultSelectedTabStyles = [
    "[&:nth-child(1)]:bg-black/10 [&:nth-child(1)]:dark:bg-white/10",
    "[&:nth-child(2)]:bg-black/10 [&:nth-child(2)]:dark:bg-white/10",
    "[&:nth-child(3)]:bg-black/10 [&:nth-child(3)]:dark:bg-white/10",
  ];

  useEffect(() => {
    const activeTabIndex = tabs.findIndex(
      (tab) =>
        pathname.startsWith(`/${tab.title.toLowerCase()}`) ||
        pathname === `/${tab.href}`
    );
    const activeTabElement = document.getElementById(
      "uuu-btn-" + activeTabIndex
    );

    setCurrentLink(() => ({
      left: activeTabElement?.offsetLeft,
      width: activeTabElement?.getBoundingClientRect().width,
      index: activeTabIndex,
    }));
  }, [pathname, tabs]);

  return (
    <div
      className={
        "relative flex w-fit items-center justify-center overflow-hidden rounded-full border dark:border-white/10 border-black/10   dark:bg-white/5 bg-black/5 px-1 py-1.5 drop-shadow-xl backdrop-blur-2xl md:px-2"
      }
    >
      {tabs.map((link, i) => (
        <Link
          href={`/${link.href}`}
          key={i}
          id={"uuu-btn-" + i}
          onClick={() => {
            fired.current = true;
            setCurrentLink(() => ({
              left: document.getElementById("uuu-btn-" + i)?.offsetLeft,
              width: document
                .getElementById("uuu-btn-" + i)
                ?.getBoundingClientRect().width,
              index: i,
            }));
          }}
          className={cn(
            "flex h-fit items-center justify-center text-nowrap rounded-full px-4 py-1.5 text-sm transition-colors duration-200 md:px-6",
            currentLink.index === i && "dark:text-white text-black",
            fired.current
              ? ""
              : defaultSelectedTabStyles[defaultSelectedTabIndex]
          )}
        >
          {link.title}
        </Link>
      ))}
      <div
        className={"absolute inset-0 -z-[1] h-full overflow-hidden px-2 py-1.5"}
      >
        <div className={"relative h-full w-full"}>
          <div
            style={{
              left: `calc(${currentLink.left || 0}px - 0.75rem + 0.2rem)`,
              width: `${currentLink.width || 0}px`,
            }}
            className={cn(
              `absolute top-1/2 -z-[1] h-full -translate-y-1/2 rounded-full transition-[color,left,width] duration-300 after:absolute after:h-1 after:w-1/2 after:-translate-y-1.5 after:translate-x-3.5 after:rounded-md dark:after:bg-white after:bg-black/30 after:content-[''] dark:after:[box-shadow:0px_2px_25px_2px_#ffffff]  after:[box-shadow:0px_2px_25px_2px_#202020] md:after:translate-x-5`,
              fired.current ? "dark:bg-white/10 bg-black/10" : "bg-transparent"
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default TabList;
