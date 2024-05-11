import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface ICustomInputProps {
  value: string;
  startIcon?: JSX.Element;
  label: string;
  placeholder: string;
  type: "text" | "password";
  onChange: (value: string) => void;
}

const CustomInput = ({
  label,
  placeholder,
  value,
  startIcon,
  onChange,
  type,
}: ICustomInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex items-center w-64 relative">
      {startIcon && <div className="absolute left-[2px]">{startIcon}</div>}
      <input
        type={showPassword ? "text" : type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none w-full h-8 border-[1px] rounded px-8 p-1 text-sm"
      />
      {type === "password" && (
        <div onClick={handleTogglePassword} className="absolute left-[230px]">
          {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </div>
      )}
    </div>
  );
};

export default CustomInput;
