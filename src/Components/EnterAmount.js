import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { NumericFormat } from 'react-number-format';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import BodyLayout from '../Helper/BodyLayout';
import Button from '../Helper/Button';
import Input from '../Helper/Input';
import { clientDataState, topTitleState } from '../utils/atoms';
import { japaniLocalization } from '../utils/timeFormate';


const EnterAmount = () => {
  const [amountValue, setAmountValue] = useState("");
  const setClientDataState = useSetRecoilState(clientDataState);
  const setTitleState = useSetRecoilState(topTitleState);
  const { loginTime, personalInfoTime, destinationEnterTime, clientName, dateTimeEnterTime } = useRecoilValue(clientDataState);
  const navigate = useNavigate();
  const intl = useIntl();


  const timeFormatter = (time) => (
    japaniLocalization(intl.formatDate(time, {
      year: 'numeric',
      hour: 'numeric',
      hour12: false,
      minute: 'numeric',
      timeZone: 'Asia/Tokyo',
      month: '2-digit',
      day: '2-digit'
    }))
  )

  const onNextClick = () => {
    console.log(amountValue)

    const time = new Date().toISOString();

    setClientDataState((prev) => {
      const newValue = JSON.parse(JSON.stringify(prev));
      newValue.amountEnterTime = time;
      newValue.clientAmount = amountValue;
      return newValue;
    })

    navigate("/enter-note");
  }

  const jpLoginTime = timeFormatter(loginTime)

  const jpPersonalEnterTime = timeFormatter(personalInfoTime)

  const jpFromToEnterTime = timeFormatter(destinationEnterTime)

  const jpDateTimeEnterTime = timeFormatter(dateTimeEnterTime);



  useEffect(() => {
    setTitleState(`${clientName} : How much do you pay ?`)
  }, [setTitleState, clientName]);

  return (
    <BodyLayout>
      <Input
        value={jpLoginTime}
        title="Login Time"
        disabled
      />

      <Input
        value={jpPersonalEnterTime}
        title="Personal Information Enter Time"
        disabled
      />

      <Input
        value={jpFromToEnterTime}
        title="From To Enter Time"
        disabled
      />

      <Input
        value={jpDateTimeEnterTime}
        title="Date Time Enter Time"
        disabled
      />

      <div className="relative">
        <h3
          className="text-left py-2 text-base font-medium uppercase"
        >
          Enter Amount (BDT)
        </h3>
        <span className="absolute top-11 text-xl font-medium left-2">৳</span>
        <NumericFormat
          defaultValue="0"
          className='py-1.5 rounded-md px-5 text-right w-full'
          allowLeadingZeros={false}
          decimalScale={2}
          fixedDecimalScale={2}
          allowNegative={false}
          maxLength={13}
          thousandSeparator=","
          onValueChange={(values) => {
            setAmountValue(values.floatValue);
          }}
        />
      </div>



      <div className="w-full flex justify-between mt-8">
        <Button onClick={() => navigate('/date-time-select')} title="Back" />
        <Button onClick={onNextClick} title="Next" />
      </div>
    </BodyLayout>
  );
};

export default EnterAmount;