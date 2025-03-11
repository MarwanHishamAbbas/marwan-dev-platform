import { cn } from "@workspace/ui/lib/utils";
import { HTMLAttributes, type FC } from "react";

type WrapperProps = HTMLAttributes<HTMLSelectElement>;

const Wrapper: FC<WrapperProps> = ({ children, className }) => {
  return (
    <section className={cn("container mx-auto px-3 lg:max-w-5xl", className)}>
      {children}
    </section>
  );
};

export default Wrapper;
