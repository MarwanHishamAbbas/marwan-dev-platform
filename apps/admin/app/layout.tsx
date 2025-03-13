import "@workspace/ui/globals.css";

import TailwindIndicator from "@workspace/ui/components/tailwind-indicator";

import { ThemeProvider } from "@/components/providers/ThemeProvider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" suppressHydrationWarning>
      <body className="grid min-h-[100dvh] grid-rows-[1fr_auto] antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
