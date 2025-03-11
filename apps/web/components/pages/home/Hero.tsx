import Wrapper from "@/components/layout/Wrapper";
import { ArrowDown } from "lucide-react";
import React from "react";
import SafariNavbar from "./SafariNavbar";
import { Button, buttonVariants } from "@workspace/ui/components/button";
import Link from "next/link";
import Card from "@/components/ui/Card";

const Hero = () => {
  return (
    <Wrapper>
      <Card>
        <SafariNavbar />
        <div className="flex flex-col gap-10 px-3 py-10 md:gap-20 md:px-14 md:py-18">
          <h1 className="glowing text-4xl font-medium sm:text-5xl md:text-7xl lg:w-[80%]">
            I Build Digital Solutions, Interfaces &{" "}
            <span className="glowing linear">Experiences.</span>
          </h1>
          <div className="self-end space-y-4">
            <div>
              <h4 className="font-medium md:text-2xl text-lg">
                Freelance Developer. Based in Egypt.
              </h4>
              <p className="dark:text-white/50 text-black/50 md:text-lg">
                Formerly at Nudge, Upwork, and ORKA Solutions.
              </p>
            </div>
            <div className="flex gap-2">
              <Button className="max-sm:flex-1" size={"lg"}>
                Book a call
              </Button>
              <Link
                href="#work"
                className={buttonVariants({
                  className: "max-sm:flex-1",
                  variant: "outline",
                  size: "lg",
                })}
              >
                Explore work
              </Link>
            </div>
          </div>
          <div className="animate-bounce self-center">
            <ArrowDown className="size-6 md:size-8" />
          </div>
        </div>
      </Card>
    </Wrapper>
  );
};

export default Hero;
