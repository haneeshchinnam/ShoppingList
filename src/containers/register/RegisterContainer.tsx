import React, { useState } from "react";
import { initialData } from "./RegisterConfig";
import { useRegisterMutation } from "../../services";
import { useLocation, useNavigate } from "react-router-dom";
import { AppPath } from "../../routes";
import { Register } from "../../components";

const RegisterContainer = () => {
  const [formData, setFormData] = useState(initialData);
  const [register] = useRegisterMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const onChange = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [id]: { ...prev[id as keyof typeof prev], value: value },
    }));
  };

  const handleRegister = () => {
    try {
      register({
        email: formData.email.value,
        password: formData.password.value,
        firstName: formData.firstName.value,
        lastName: formData.lastName.value,
      })
        .unwrap()
        .then((res) => {
          console.log(res.message);

          navigate(`${AppPath.login}`);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Register
        formData={formData}
        onChange={onChange}
        handleRegister={handleRegister}
      />
    </div>
  );
};

export default RegisterContainer;
