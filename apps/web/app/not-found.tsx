"use client";

import SecondaryNavbar from "@/components/layout/Navbar/SecondaryNavbar";
import Wrapper from "@/components/layout/Wrapper";
import TopGradient from "@/components/ui/TopGradient";

import { buttonVariants } from "@workspace/ui/components/button";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div>
      <TopGradient />
      <SecondaryNavbar label="Home" goToPage="" />
      <Wrapper className="flex flex-col items-center justify-center gap-4">
        <h1 className="glowing text-6xl font-bold md:text-9xl">404</h1>
        <p className="text-center text-3xl uppercase md:text-5xl">
          Sorry, There&apos;s <br /> nothing here{" "}
        </p>
        <Link
          href="/"
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          Go Home
        </Link>
      </Wrapper>
    </div>
  );
};

export default NotFound;
