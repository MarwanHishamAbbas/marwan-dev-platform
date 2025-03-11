import "@workspace/ui/globals.css";

import TailwindIndicator from "@workspace/ui/components/tailwind-indicator";
import Footer from "@/components/layout/Footer";
import { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import Navbar from "@/components/layout/Navbar/Navbar";
import { getTheme } from "@/lib/theme";

const dmSans = DM_Sans({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await getTheme();
  return (
    <html
      lang="en-US"
      className={`${dmSans.className} ${theme}`}
      suppressHydrationWarning
    >
      <body className="grid min-h-[100dvh] grid-rows-[1fr_auto] antialiased">
        <Navbar />

        <main className="md:mt-46 mb-20 mt-36 md:mb-32">{children}</main>
        <hr className="border-white/5" />
        <Footer />
        <TailwindIndicator />
      </body>
    </html>
  );
}
