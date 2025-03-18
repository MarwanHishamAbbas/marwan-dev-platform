import SecondaryNavbar from "@/components/layout/Navbar/SecondaryNavbar";
import TopGradient from "@/components/ui/TopGradient";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopGradient />
      <SecondaryNavbar label="Blog" goToPage="blog" />
      {children}
    </>
  );
}
