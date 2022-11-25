import React from 'react';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import { useSetRecoilState } from 'recoil';
import BodyLayout from '../Helper/BodyLayout';
import Button from '../Helper/Button';
import { clientDataState } from '../store/atoms';

const SuccessPage = () => {
  const navigate = useNavigate();
  const setClientDataState = useSetRecoilState(clientDataState);

  const restartFunction = () => {
    secureLocalStorage.clear()
    setClientDataState({})
    navigate('/top')
  }

  return (
    <BodyLayout>
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col justify-between gap-8">
          <p className="text-xl">Thank you!</p>
          <p>Your reservation ID:</p>
        </div>

        <div className="w-full flex justify-between mt-8">
          <Button onClick={() => navigate('/top')} title="Back" />
          <Button title="Restart" onClick={restartFunction}/>
        </div>
      </div>
    </BodyLayout>
  );
};

export default SuccessPage;