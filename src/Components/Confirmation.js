import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import BodyLayout from '../Helper/BodyLayout';
import { clientDataState, topTitleState } from '../utils/atoms';

const Confirmation = () => {
  const setTitleState = useSetRecoilState(topTitleState);
  // const setClientDataState = useSetRecoilState(clientDataState);
  const { loginTime, personalInfoTime, destinationEnterTime, clientName, dateTimeEnterTime, amountEnterTime, clientNote } = useRecoilValue(clientDataState);


  useEffect(() => {
    setTitleState(`${clientName} : Final Confirmation`)
  }, [setTitleState, clientName]);
  return (
    <BodyLayout>

    </BodyLayout>
  );
};

export default Confirmation;