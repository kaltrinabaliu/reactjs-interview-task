import React from "react";

interface ActionButtonProps {
  label?: string;
  click?: () => void;
  bgColor: string;
  widthsize?: string;
  hoverBgColor?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  click,
  bgColor,
  widthsize,
  iconLeft,
  iconRight,
}) => {
  return (
    <div className="w-full relative">
      <button
        onClick={click}
        style={{ backgroundColor: bgColor, width: widthsize }}
        className={`flex items-center justify-around text-white whitespace-nowrap w-full p-2 rounded text-[14px]`}
      >
        {iconLeft && <span className="mr-2">{iconLeft}</span>}
        {label}
        {iconRight && <span className="ml-2">{iconRight}</span>}
      </button>
    </div>
  );
};

export default ActionButton;
