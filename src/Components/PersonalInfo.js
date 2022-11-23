import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { clientDataState, topTitleState } from '../helper/atoms';
import { japaniLocalization } from '../helper/timeFormate';
import BodyLayout from '../Layout/BodyLayout';
import Input from '../Layout/Input';

const PersonalInfo = () => {
  const setTitleState = useSetRecoilState(topTitleState);
  const [errorMessage, setErrorMessage] = useState("");
  const { register, handleSubmit } = useForm();
  const { loginTime } = useRecoilValue(clientDataState);
  const intl = useIntl()

  const loggedinTime = japaniLocalization(intl.formatDate(loginTime, {
    year: 'numeric',
    hour: 'numeric',
    hour12: false,
    minute: 'numeric',
    timeZone: 'Asia/Tokyo',
    month: '2-digit',
    day: '2-digit'
  }))


  const onSubmit = (data) => {
    console.log(data)
  };

  useEffect(() => {
    setTitleState("Personal Information")
  }, [setTitleState]);

  return (
    <BodyLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" register={register} name="login_time" value={loggedinTime} title="Login Time" disabled />
        <Input register={register} title="Name" name="name" />
        {
          errorMessage &&
          <p className="error-message">{errorMessage}</p>
        }
        <div className="button-container">
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-2.5 text-center">Next</button>
        </div>
      </form>
    </BodyLayout>
  );
};

export default PersonalInfo;