import { PropsWithChildren, type FC } from "react";

const Slicer: FC<PropsWithChildren> = ({ children }) => {
  return <main className="space-y-10 md:space-y-14">{children}</main>;
};

export default Slicer;
