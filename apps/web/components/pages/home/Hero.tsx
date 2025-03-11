import Wrapper from "@/components/layout/Wrapper";
import { ArrowDown } from "lucide-react";
import React from "react";
import SafariNavbar from "./SafariNavbar";
import { Button } from "@workspace/ui/components/button";

const Hero = () => {
  return (
    <Wrapper>
      <section className="top-seperator rounded-3xl border dark:border-white/15 border-black/15 bg-cover bg-center bg-no-repeat p-1.5">
        <div className="top-seperator bottom h-full rounded-2xl border dark:border-white/30 border-black/30">
          <SafariNavbar />
          <div className="bottom-gradient flex flex-col gap-10 px-3 py-10 md:gap-20 md:px-14 md:py-18">
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
              <div className="space-x-2">
                {" "}
                <Button size={"lg"}>Book a call</Button>
                <Button variant={"outline"} size={"lg"}>
                  Explore work
                </Button>
              </div>
            </div>
            <div className="animate-bounce self-center">
              <ArrowDown className="size-6 md:size-8" />
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

export default Hero;
