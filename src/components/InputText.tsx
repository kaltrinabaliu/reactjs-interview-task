import React from "react";

const InputText = ({ label, placeholder, value, onChange }: any) => {
  return (
    <div className="flex flex-col w-full min-w-[300px] mb-4">
      <p className="text-[14px] mb-2 font-bold">{label}</p>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border border-gray-300 p-2 rounded outline-none focus:border focus:border-blue-500"
      />
    </div>
  );
};

export default InputText;
