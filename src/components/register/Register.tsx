import React from 'react'
import { IFields } from '../../containers/register/RegisterConfig';
import CustomInput from '../CustomInput';

interface IRegisterProps {
  formData: IFields;
  onChange: (id: string, value: string) => void;
  handleRegister: () => void
}

const Register = ({formData, handleRegister,onChange}: IRegisterProps) => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen">
      <p className='text-left'>Register</p>
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
      <button className="bg-blue-600 text-white py-2 px-4 rounded" onClick={() => handleRegister()}>Sign Up</button>
    </div>
  )
}

export default Register