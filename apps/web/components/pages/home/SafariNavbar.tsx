import { Plus } from "lucide-react";
import React from "react";

const SafariNavbar = () => {
  return (
    <nav
      style={{
        background: `linear-gradient(
			90deg,
			rgba(242, 242, 242, 0.1) 0%,
			rgba(242, 242, 242, 0.5) 50%,
			rgba(242, 242, 242, 0.1) 100%
		)`,
        boxShadow: `0px 10px 20px 4px rgba(0, 0, 0, 0.2)`,
        backdropFilter: `blur(20px)`,
        borderRadius: `16px 16px 0px 0px`,
      }}
      className="flex h-10 items-center justify-between rounded-2xl px-4"
    >
      <div className="flex items-center gap-2">
        <div className="size-3 rounded-full border border-solid border-black/25 bg-red shadow-lg shadow-red"></div>
        <div className="size-3 rounded-full border border-solid border-black/25 bg-yellow shadow-lg shadow-yellow"></div>
        <div className="size-3 rounded-full border border-solid border-black/25 bg-green shadow-lg shadow-green"></div>
      </div>
      <Plus className="size-5" />
    </nav>
  );
};

export default SafariNavbar;
