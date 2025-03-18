"use client";

import { Button } from "@workspace/ui/components/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FC } from "react";

interface SecondaryNavbarProps {
  goToPage: string;
  label: string;
}

const SecondaryNavbar: FC<SecondaryNavbarProps> = ({ goToPage, label }) => {
  const router = useRouter();
  return (
    <header className="container fixed left-0 right-0 top-0 z-50 mx-auto flex h-20 items-center px-3 drop-shadow-md backdrop-blur-md xl:drop-shadow-none xl:backdrop-blur-none">
      <Button
        variant={"outline"}
        onClick={() => {
          router.push(`/${goToPage ?? null}`);
        }}
        className="gap-2 group"
      >
        <ArrowLeft
          size={18}
          className="transition-transform duration-300 group-hover:-translate-x-2"
        />
        {label}
      </Button>
    </header>
  );
};

export default SecondaryNavbar;
