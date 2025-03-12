import Navbar from "@/components/layout/Navbar";
import { db, user } from "@workspace/database";
import { Loader } from "lucide-react";

export default async function Page() {
  const users = await db.query.user.findMany();

  if (!users) return <Loader className="animate-spin" />;

  return (
    <>
      <Navbar
        items={[
          {
            label: "Dashboard",
            isCurrentPage: true,
          },
        ]}
      />
      <div>
        {users.map(({ email }) => (
          <h1 key={email}>{email}</h1>
        ))}
      </div>
    </>
  );
}
