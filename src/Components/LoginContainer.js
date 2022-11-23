import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { topTitleState } from '../atoms/atoms';
import BodyLayout from '../Layout/BodyLayout';
import Input from '../Layout/Input';
import '../styles/Login.css';


const LoginContainer = () => {
  const { register, handleSubmit } = useForm();
  const setTitleState = useSetRecoilState(topTitleState);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") || "";
  const password = searchParams.get("password") || "";

  const onSubmit = data => console.log(data);

  useEffect(() => {
    setTitleState("Login")
  }, [setTitleState]);

  return (
    <BodyLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" register={register} name="id" value={id} />
        <Input type="password" register={register} name="password" value={password} />
        <button type="submit" className="submit-btn">Login</button>
      </form>
    </BodyLayout>
  );
};

export default LoginContainer;