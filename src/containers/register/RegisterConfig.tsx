import { FaLock } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";

interface IInputField {
  key: string;
  value: string;
  startIcon?: JSX.Element;
  label: string;
  placeholder: string;
  type: "text" | "password";
}

export interface IFields{
    email: IInputField;
    password: IInputField;
    firstName: IInputField;
    lastName: IInputField;
}

export const initialData: IFields = {
    email: {
        key: 'email',
        label: 'Email',
        placeholder: 'Enter Email',
        type: 'text',
        value: '',
        startIcon: <BiLogoGmail className="text-black z-10 w-8" />
    },
    firstName: {
        key: 'firstName',
        label: 'First Name',
        placeholder: 'Enter First Name',
        type: 'text',
        value: '',
        startIcon: <BsFillPersonFill className="text-black z-10 w-8" />
    },
    lastName: {
        key: 'lastName',
        label: 'Last Name',
        placeholder: 'Enter Last Name',
        type: 'text',
        value: '',
        startIcon: <BsFillPersonFill className="text-black z-10 w-8" />
    },
    password: {
        key: 'password',
        label: 'Password',
        placeholder: 'Enter Password',
        type: 'password',
        value: '',
        startIcon: <FaLock className="text-black z-10 w-8" />
    }
}