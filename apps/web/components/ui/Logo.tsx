"use client";

import { type FC } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Circle } from "lucide-react";
import { Skeleton } from "@workspace/ui/components/skeleton";

interface LogoProps {}

const Logo: FC<LogoProps> = ({}) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <Skeleton className="size-8 rounded-full" />;
  }
  return (
    <Image
      src={theme === "light" ? "/logo-dark.png" : "/logo.png"}
      alt="Marwan's Logo"
      width={32}
      height={32}
      loading={"eager"}
    />
  );
};

export default Logo;
