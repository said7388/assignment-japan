import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { topTitleState } from '../helper/atoms';
import BodyLayout from '../Layout/BodyLayout';
import Input from '../Layout/Input';

const TopPageContainer = () => {
  const setTitleState = useSetRecoilState(topTitleState);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data)
  };

  const handleMakeReservations = () => {
    navigate("/personal-info");
  }

  useEffect(() => {
    setTitleState("Top")
  }, [setTitleState]);

  return (
    <BodyLayout>
      <div>
        <div className="flex justify-center">
          <button className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-2.5 text-center"
            onClick={handleMakeReservations}>Make new reservation</button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input type="text" register={register} title="Reservation ID" name="search" />
          <div className="button-container">
            <button type="submit" className="mt-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-2.5 text-center">Search</button>
          </div>
        </form>
      </div>
    </BodyLayout>
  );
};

export default TopPageContainer;