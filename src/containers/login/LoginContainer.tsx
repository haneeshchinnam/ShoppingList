import React, { useState } from "react";
import { initialData } from "./LoginConfig";
import { Login } from "../../components";
import { setAuthProfile, useLoginMutation } from "../../services";
import { useNavigate } from "react-router-dom";
import { AppPath } from "../../routes";
import { useDispatch } from "react-redux";

const LoginContainer = () => {
  const [formData, setFormData] = useState(initialData);
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [id]: { ...prev[id as keyof typeof prev], value: value },
    }));
  };

  const handleLogin = () => {
    try {
      login({ email: formData.email.value, password: formData.password.value }).unwrap().then((res) => {
        dispatch(setAuthProfile(res));
        navigate(AppPath.product);
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Login formData={formData} onChange={onChange} handleLogin={handleLogin} />
    </div>
  );
};

export default LoginContainer;
