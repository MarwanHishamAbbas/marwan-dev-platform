import { type FC } from "react";

interface TopGradientProps {}

const TopGradient: FC<TopGradientProps> = ({}) => {
  return (
    <div className="absolute top-0 z-[-2] h-screen w-full dark:bg-background bg-white dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.1),rgba(255,255,255,0))] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(10,20,40,0.2),rgba(0,0,0,0))]"></div>
  );
};

export default TopGradient;
