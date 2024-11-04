import React from "react";

interface ActionButtonProps {
  label?: string;
  click?: () => void;
  bgColor: string;
  widthsize?: string;
  hoverBgColor?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  textColor?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  click,
  bgColor,
  widthsize,
  iconLeft,
  iconRight,
  textColor,
}) => {
  return (
    <div className="w-full relative">
      <button
        onClick={click}
        style={{ backgroundColor: bgColor, width: widthsize, color: textColor }}
        className={`flex items-center justify-between text-white whitespace-nowrap px-3 py-2 w-full rounded text-[14px]`}
      >
        <div className="flex items-center">
          {iconLeft && <span className="text-current mr-2">{iconLeft}</span>}
          {label && <span>{label}</span>}
        </div>
        {iconRight && <span className="text-current mr-2">{iconRight}</span>}
      </button>
    </div>
  );
};

export default ActionButton;
