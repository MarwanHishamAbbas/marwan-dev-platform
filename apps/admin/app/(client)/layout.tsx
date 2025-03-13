import "@workspace/ui/globals.css";

import { AppSidebar } from "@/components/app-sidebar";

import {
  SidebarInset,
  SidebarProvider,
} from "@workspace/ui/components/sidebar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
