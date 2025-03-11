import "@workspace/ui/globals.css";

import TailwindIndicator from "@workspace/ui/components/tailwind-indicator";
import { DM_Sans } from "next/font/google";
import { AppSidebar } from "@/components/app-sidebar";

import { Separator } from "@workspace/ui/components/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const dmSans = DM_Sans({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-US"
      className={`${dmSans.className}`}
      suppressHydrationWarning
    >
      <body className="grid min-h-[100dvh] grid-rows-[1fr_auto] antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>{children}</SidebarInset>
          </SidebarProvider>
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
