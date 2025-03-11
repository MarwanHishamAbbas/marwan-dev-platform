import { Button } from "@workspace/ui/components/button";
import { ArrowUpRight, Linkedin } from "lucide-react";
import Link from "next/link";
import React from "react";

const Links = () => {
  return (
    <>
      <ExternalLinks />

      <Button variant={"ghost"} size={"icon"} className="md:hidden">
        <Link href="https://www.linkedin.com/in/marwanhiisham/" target="_blank">
          <Linkedin size={20} />
        </Link>
      </Button>
    </>
  );
};

export default Links;

export const ExternalLinks = () => {
  return (
    <div className="md:flex hidden">
      <Button variant={"ghost"} className="px-0 md:px-3">
        <Link
          href="https://www.linkedin.com/in/marwanhiisham/"
          target="_blank"
          className="flex items-center gap-2"
        >
          LinkedIn <ArrowUpRight size={18} />{" "}
        </Link>
      </Button>
      <Button variant={"ghost"} className="px-0 md:px-3">
        <Link
          href="https://drive.google.com/file/d/1f61NtNNNSMisb7RwVcfoJQmsu-QTttZ2/view?usp=sharing"
          target="_blank"
          className="flex items-center gap-2"
        >
          Resume <ArrowUpRight size={18} />
        </Link>
      </Button>
    </div>
  );
};
