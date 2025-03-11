import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "@workspace/ui/components/button";

const Footer = () => {
  return (
    <footer className="container mx-auto space-y-10 px-3 py-12">
      <div className="flex flex-col items-start justify-between gap-10 md:flex-row">
        <Image
          src="/logo.png"
          alt="Logo"
          width={35}
          height={35}
          loading={"eager"}
        />
        <div className="flex gap-10">
          <div className="flex flex-col gap-2">
            <p className="font-medium text-white/50">MAIN</p>
            <Button variant={"ghost"}>
              <Link href="/" className="flex items-c enter gap-2">
                Work
              </Link>
            </Button>
            <Button variant={"ghost"}>
              <Link href="/info" className="flex items-center gap-2">
                Info
              </Link>
            </Button>
            <Button variant={"ghost"}>
              <Link href="/blog" className="flex items-center gap-2">
                Blog
              </Link>
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-medium text-white/50">CONTACT</p>
            <Button variant={"ghost"}>
              <Link
                href="https://www.linkedin.com/in/marwanhiisham/"
                target="_blank"
                className="flex items-center gap-2"
              >
                LinkedIn <ArrowUpRight size={18} />{" "}
              </Link>
            </Button>
            <Button variant={"ghost"}>
              <Link
                href="https://drive.google.com/file/d/1ipikoEtwBBa5HlMTwCr2oU0ogNdkiXX8/view?usp=sharing"
                target="_blank"
                className="flex items-center gap-2"
              >
                Resume <ArrowUpRight size={18} />{" "}
              </Link>
            </Button>
            <Button variant={"ghost"}>
              <Link
                href="mailto:marwanhishamdev@gmail.com"
                target="_blank"
                className="flex items-center gap-2"
              >
                Email <ArrowUpRight size={18} />{" "}
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div className="text-sm md:text-base">
          <p>© 2025 Marwan Hisham. All Rights Reserved.</p>
          <p className="text-white/50">
            Made with Love and Expresso (0% sugar, 20% Milk).
          </p>
        </div>
        <p className="text-sm text-white/50">
          Last updated by Marwan on Feb 2, 2025, 7:10 PM EST
        </p>
      </div>
    </footer>
  );
};

export default Footer;
