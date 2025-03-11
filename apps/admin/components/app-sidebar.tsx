"use client";

import * as React from "react";
import { Command, Frame, LifeBuoy, SquareTerminal } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar";
import ThemeToggle from "./theme/ThemeToggle";
import Link from "next/link";
import Logo from "./ui/Logo";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/logo.png",
  },
  navMain: [
    {
      title: "Projects",
      url: "/projects",
      icon: Command,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
      ],
    },
  ],

  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
  ],
  navSecondary: [
    {
      title: "Portfolio Website",
      url: "http://localhost:3000",
      icon: LifeBuoy,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div>
                <Link
                  href="/"
                  className=" text-sidebar-primary-foreground flex aspect-square size-7 items-center justify-center rounded-lg"
                >
                  <Logo />
                </Link>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Marwan Hisham</span>
                  <span className="truncate text-xs dark:text-white/70 text-black/70">
                    Full-Stack Developer
                  </span>
                </div>
                <ThemeToggle />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
