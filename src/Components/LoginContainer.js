import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import { useSetRecoilState } from 'recoil';
import { clientDataState, topTitleState } from '../helper/atoms';
import BodyLayout from '../Layout/BodyLayout';
import Input from '../Layout/Input';
import '../styles/Login.css';


const LoginContainer = () => {
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const setTitleState = useSetRecoilState(topTitleState);
  const setClientDataState = useSetRecoilState(clientDataState);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");
  const password = searchParams.get("password");

  const onSubmit = data => {
    if (data.id === "badaccount" || data.password === "badpassword") {
      setErrorMessage("Please Try with another ID or Password!")
      return;
    }

    console.log(data)
    const time = new Date().toISOString();
    setClientDataState((prev) => {
      const newValue = JSON.parse(JSON.stringify(prev));
      newValue.loginTime = time;
      return newValue;
    })

    navigate("/top");
  };

  useEffect(() => {
    setTitleState("Login")
    secureLocalStorage.clear()
  }, [setTitleState]);

  return (
    <BodyLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" register={register} name="id" title="ID" defaultValue={id || ""} />
        <Input type="password" register={register} title="Password" name="password" defaultValue={password || ""} />
        {
          errorMessage &&
          <p className="error-message">{errorMessage}</p>
        }
        <div className="button-container">
          <button type="submit" className="submit-btn">Login</button>
        </div>
      </form>
    </BodyLayout>
  );
};

export default LoginContainer;