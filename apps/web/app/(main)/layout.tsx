import Navbar from "@/components/layout/Navbar/Navbar";
import TopGradient from "@/components/ui/TopGradient";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopGradient />
      <Navbar />
      {children}
    </>
  );
}
