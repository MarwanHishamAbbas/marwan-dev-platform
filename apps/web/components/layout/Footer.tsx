import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "@workspace/ui/components/button";
import Logo from "../ui/Logo";
import ThemeToggle from "../theme/ThemeToggle";

const Footer = () => {
  return (
    <footer className="container mx-auto space-y-10 px-3 py-12">
      <div className="flex flex-col items-start justify-between gap-10 md:flex-row">
        <Logo />
        <div className="flex gap-10">
          <div className="flex flex-col gap-2 items-center">
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
          <div className="flex flex-col gap-2 items-center">
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
        <div className="text-sm ">
          <p>© 2025 Marwan Hisham. All Rights Reserved.</p>
          <p className="dark:text-white/50 text-black/50">
            Made with Love and Expresso (0% sugar, 20% Milk).
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <div className="md:text-right">
            <ThemeToggle />
          </div>
          <p className="text-sm dark:text-white/50 text-black/50">
            Last updated by Marwan on Feb 2, 2025, 7:10 PM EST
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
