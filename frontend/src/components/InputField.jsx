import React from "react";

const InputField = ({type, value, onChange, placeholder, name }) => {
  return (
    <div>
      <label className="flex flex-col">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="bg-[#292929] px-6 py-2 placeholder:text-[#464647] text-[#BCBCBC] rounded-xl outline-none border-none font-medium"
        />
      </label>
    </div>
  );
};

export default InputField;
