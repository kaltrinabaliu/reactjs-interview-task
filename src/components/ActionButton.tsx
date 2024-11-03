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
    <div className="w-1/2 relative">
      <button
        onClick={click}
        style={{ backgroundColor: bgColor, width: widthsize }}
        className={`flex items-center justify-center text-white whitespace-nowrap px-4 py-2 rounded `}
      >
        {iconLeft && <span className="mr-2">{iconLeft}</span>}
        {label}
        {iconRight && <span className="ml-2">{iconRight}</span>}
      </button>
    </div>
  );
};

export default ActionButton;
