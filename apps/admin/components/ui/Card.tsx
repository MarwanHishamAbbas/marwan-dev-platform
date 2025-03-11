import { cn } from "@workspace/ui/lib/utils";
import { HTMLAttributes, PropsWithChildren, type FC } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

const Card: FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <section
      className={cn(
        "top-seperator rounded-3xl border dark:border-white/15 border-black/15 p-1.5",
        className
      )}
      {...props}
    >
      <div className="top-seperator bottom h-full rounded-2xl border dark:border-white/30 border-black/30 overflow-hidden">
        {children}
      </div>
    </section>
  );
};

export default Card;
