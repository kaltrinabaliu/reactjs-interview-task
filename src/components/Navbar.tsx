import React from "react";
import IconClose from "./icons/IconClose";

const Navbar = () => {
  return (
    <div className="w-full top-0 left-0 right-0 bg-blue-900 p-2">
      <div className="flex justify-between text-white text-[40px]">
        <div>Your Notes</div>
        <div>
          <IconClose />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
