import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import BodyLayout from '../Helper/BodyLayout';
import Input from '../Helper/Input';

const TopPageContainer = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data)
  };

  const handleMakeReservations = () => {
    navigate("/personal-info");
  }

  return (
    <BodyLayout>
      <div>
        <div className="flex justify-center">
          <button
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-2.5 text-center"
            onClick={handleMakeReservations}>
            Make new reservation
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            errors={errors}
            register={register}
            title="Reservation ID"
            name="search" />
          <div
            className="my-8 flex justify-end"
          >
            <button
              type="submit"
              className="mt-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-2.5 text-center">
              Search
            </button>
          </div>
        </form>
      </div>
    </BodyLayout>
  );
};

export default TopPageContainer;