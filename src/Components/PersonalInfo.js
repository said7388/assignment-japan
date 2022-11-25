import React from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import BodyLayout from '../Helper/BodyLayout';
import Button from '../Helper/Button';
import Input from '../Helper/Input';
import { clientDataState } from '../store/atoms';
import { japaniLocalization } from '../utils/timeFormate';

const PersonalInfo = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { loginTime, clientName } = useRecoilValue(clientDataState);
  const setClientDataState = useSetRecoilState(clientDataState);
  const navigate = useNavigate();
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


  const onSubmit = data => {
    const time = new Date().toISOString();

    setClientDataState((prev) => {
      const newValue = JSON.parse(JSON.stringify(prev));
      newValue.personalInfoTime = time;
      newValue.clientName = data.name;
      newValue.clientGender = data.gender;
      return newValue;
    })

    navigate("/destination-select");
  };



  return (
    <BodyLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          value={loggedinTime}
          title="Login Time"
          disabled
        />

        <Input
          register={register}
          title="Name"
          name="name"
          defaultValue={clientName || ""}
          errors={errors}
          required={true}
        />

        {errors.name?.type === 'required' && <p role="alert" className="text-red-500">Name is required</p>}

        <p className="text-left text-base font-medium py-5 uppercase">Gender</p>
        <div className="ml-6">
          <Input
            type="radio"
            register={register}
            title="Male"
            name="gender" />
          <Input
            type="radio"
            register={register}
            title="Female"
            name="gender" />
        </div>

        <div className="w-full flex justify-end mt-8">
          <Button title="Next" />
        </div>
      </form>
    </BodyLayout>
  );
};

export default PersonalInfo;