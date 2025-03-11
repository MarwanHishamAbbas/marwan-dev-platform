import { HTMLAttributes, type FC } from "react";

type SlicerProps = HTMLAttributes<HTMLDivElement>;

const Slicer: FC<SlicerProps> = ({ children, ...props }) => {
  return (
    <main className="space-y-10 md:space-y-14" {...props}>
      {children}
    </main>
  );
};

export default Slicer;
