import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import { useSetRecoilState } from 'recoil';
import BodyLayout from '../Helper/BodyLayout';
import Input from '../Helper/Input';
import { clientDataState } from '../store/atoms';


const LoginContainer = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
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

    const time = new Date().toISOString();

    setClientDataState((prev) => {
      const newValue = JSON.parse(JSON.stringify(prev));
      newValue.loginTime = time;
      return newValue;
    })

    navigate("/top");
  };

  useEffect(() => {
    secureLocalStorage.clear()
  }, []);

  return (
    <BodyLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          register={register}
          required={true}
          errors={errors}
          name="id"
          title="ID"
          defaultValue={id || ""}
        />

        {errors.id?.type === 'required' && <p role="alert" className="text-red-500">ID is required</p>}

        <Input
          type="password"
          register={register}
          required={true}
          errors={errors}
          title="Password"
          name="password"
          defaultValue={password || ""}
        />

        {errors.password?.type === 'required' && <p role="alert" className="text-red-500">Password is required</p>}

        {
          errorMessage &&
          <p className="pt-3 text-red-500">{errorMessage}</p>
        }

        <div className="flex mt-8 justify-end ">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-2.5 text-center"
          >
            Login
          </button>
        </div>

      </form>
    </BodyLayout >
  );
};

export default LoginContainer;