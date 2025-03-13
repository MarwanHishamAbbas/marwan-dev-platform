import Navbar from "@/components/layout/Navbar";

export default async function Page() {
  return (
    <>
      <Navbar
        items={[
          {
            label: "Admin Dashboard",
            isCurrentPage: true,
          },
        ]}
      />
    </>
  );
}
