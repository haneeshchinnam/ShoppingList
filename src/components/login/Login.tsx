import React from "react";
import { IFields } from "../../containers/login/LoginConfig";
import CustomInput from "../CustomInput";

interface ILoginProps {
  formData: IFields;
  onChange: (id: string, value: string) => void;
  handleLogin: () => void
}

const Login = ({ formData, onChange, handleLogin }: ILoginProps) => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen">
      <p className='text-left'>Login</p>
      {Object.values(formData).map((field) => (
        <CustomInput
          key={field.key}
          label={field.label}
          onChange={(value) => onChange(field.key, value)}
          placeholder={field.placeholder}
          type={field.type}
          value={field.value}
          startIcon={field.startIcon}
        />
      ))}
      <button className="bg-blue-600 text-white py-2 px-4 rounded" onClick={() => handleLogin()}>Sign In</button>
    </div>
  );
};

export default Login;
