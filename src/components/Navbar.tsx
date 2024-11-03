import React from "react";
import IconClose from "./icons/IconClose";

const Navbar = () => {
  return (
    <div className="w-full top-0 left-0 right-0 bg-[#1F2A44] p-2">
      <div className="flex justify-between items-center text-white text-[16px]">
        <div>Your Notes</div>
        <div>
          <IconClose />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
