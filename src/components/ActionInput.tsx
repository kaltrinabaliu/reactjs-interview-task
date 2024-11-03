import React from "react";

interface ActionInputProps {
  placeholder: string;
  firstclick?: () => void;
  secondclick?: () => void;
  bgColor?: string;
  iconRightfirst?: React.ReactNode;
  iconRightsecond?: React.ReactNode;
  iconLeft?: React.ReactNode;
  borderColor?: string;
}

const ActionInput: React.FC<ActionInputProps> = ({
  placeholder,
  bgColor,
  iconRightfirst,
  iconRightsecond,
  iconLeft,
  firstclick,
  secondclick,
  borderColor,
}) => {
  return (
    <div className="relative bg-white">
      {iconLeft && (
        <span className="absolute left-0 top-1/3 transform -translate-y-1/2 pl-2">
          {iconLeft}
        </span>
      )}
      <input
        type="text"
        placeholder={placeholder}
        className={`focus:outline-none w-full ${bgColor}`}
        style={{
          paddingLeft: iconLeft ? "2rem" : undefined,
          paddingRight: iconRightfirst || iconRightsecond ? "pr-20" : "",
          border: borderColor,
        }}
      />
      {iconRightfirst && (
        <span
          className="absolute right-8 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={firstclick}
        >
          {iconRightfirst}
        </span>
      )}
      {iconRightsecond && (
        <span
          className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={secondclick}
        >
          {iconRightsecond}
        </span>
      )}
    </div>
  );
};

export default ActionInput;
