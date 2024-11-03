import React from "react";

interface ActionInputProps {
  placeholder: string;
  value?: string;
  firstclick?: () => void;
  secondclick?: () => void;
  bgColor?: string;
  iconRightfirst?: React.ReactNode;
  iconRightsecond?: React.ReactNode;
  iconLeft?: React.ReactNode;
  borderColor?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ActionInput: React.FC<ActionInputProps> = ({
  placeholder,
  value,
  bgColor,
  iconRightfirst,
  iconRightsecond,
  iconLeft,
  firstclick,
  secondclick,
  borderColor,
  onChange,
}) => {
  return (
    <div className="relative bg-white w-1/2">
      {iconLeft && (
        <span className="absolute left-0 top-1/2 transform -translate-y-1/2 pl-2">
          {iconLeft}
        </span>
      )}
      <input
        type="text"
        placeholder={placeholder}
        className={`${bgColor} focus:outline-none w-full ${
          borderColor ? "border px-3 py-2 rounded-full" : ""
        }`}
        value={value}
        style={{
          paddingLeft: iconLeft ? "2rem" : undefined,
          paddingRight: iconRightfirst || iconRightsecond ? "pr-20" : "",
          borderColor: borderColor,
        }}
        onChange={onChange}
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
