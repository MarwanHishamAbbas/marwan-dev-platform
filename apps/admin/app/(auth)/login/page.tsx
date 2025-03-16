"use client";

import { Button, buttonVariants } from "@workspace/ui/components/button";
import { signIn } from "next-auth/react";
import { useTransition, type FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import ThemeToggle from "@/components/theme/ThemeToggle";
import Logo from "@/components/ui/Logo";

type PageProps = {};

const Page: FC<PageProps> = ({}) => {
  const [isLoading, googleTransition] = useTransition();

  async function signInGoogle() {
    googleTransition(async () => {
      await signIn("google").catch((error) => console.log(error));
    });
  }

  return (
    <div className="grid min-h-[100dvh] grid-rows-[1fr_auto]">
      <div className="fixed top-10 right-10">
        <ThemeToggle />
      </div>
      <div className="flex items-center justify-center">
        <Card className="w-full max-w-2xl ">
          <CardHeader className=" text-center">
            <div className="flex justify-center mb-2">
              <Logo />
            </div>
            <CardTitle className="text-4xl font-bold leading-none">
              Marwan Development Platform
            </CardTitle>
            <CardDescription className="text-base">
              Welcome back. Sign in to access your dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center flex-col">
            <Button
              className="w-fit"
              variant="outline"
              onClick={signInGoogle}
              disabled={isLoading}
            >
              <span className="flex items-center justify-center gap-2">
                {isLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                    <path d="M1 1h22v22H1z" fill="none" />
                  </svg>
                )}
                Sign in with Google
              </span>
            </Button>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link
              href={process.env.NEXT_PUBLIC_PORTFOLIO_URL ?? ""}
              className={buttonVariants({ variant: "ghost" })}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit my portfolio <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Page;
