import React from 'react';
import { useNavigate } from 'react-router-dom';
import BodyLayout from '../Helper/BodyLayout';
import Button from '../Helper/Button';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <BodyLayout>
      <div className="flex flex-col justify-between items-center">
        <p className="w-full text-2xl text-center my-8 text-red-500">
          This name already exists!
        </p>
        <Button
          onClick={() => navigate(-1)}
          title="Back" />
      </div>
    </BodyLayout>
  );
};

export default ErrorPage;