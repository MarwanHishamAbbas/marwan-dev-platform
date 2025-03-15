"use client";

import * as React from "react";
import { Command, Frame, Globe, Paperclip } from "lucide-react";

import { NavMain } from "@/components/nav-main";

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

import Link from "next/link";
import Logo from "./ui/Logo";
import { useSession } from "next-auth/react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: user } = useSession();
  const data = {
    navMain: [
      {
        title: "Projects",
        url: "/admin/projects",
        icon: Command,
        isActive: true,
        items: [
          {
            title: "History",
            url: "#",
          },
        ],
      },
      {
        title: "Blog Posts",
        url: "/admin/blog-posts",
        icon: Paperclip,
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
        url: process.env.NEXT_PUBLIC_PORTFOLIO_URL ?? "http://localhost:3000",
        icon: Globe,
      },
    ],
  };
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
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />

        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user?.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
