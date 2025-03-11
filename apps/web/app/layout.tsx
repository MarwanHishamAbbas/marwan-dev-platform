import "@workspace/ui/globals.css";

import TailwindIndicator from "@workspace/ui/components/tailwind-indicator";
import Footer from "@/components/layout/Footer";
import { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import Navbar from "@/components/layout/Navbar/Navbar";

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
          <Navbar />
          <main className="md:mt-46 mb-20 mt-36 md:mb-32">{children}</main>
          <hr className="border-white/5" />
          <Footer />
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
