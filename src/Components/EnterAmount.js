import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
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
  const { register, formState: { errors }, handleSubmit } = useForm();


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

  const currencyConverter = (currency) => {
    const bdtFormat = intl.formatNumber(currency, { style: 'currency', currency: 'BDT' });
    const dd = bdtFormat.slice(0, bdtFormat.length - 4).replace(',', '.');
    return dd;
  }


  const onChangeAmount = (e) => {
    console.log((e.target.value).replace(',', ''))
    setAmountValue(e.target.value.replace(',', ''))
  }

  const onSubmit = (data) => {
    console.log(data)

    const time = new Date().toISOString();

    setClientDataState((prev) => {
      const newValue = JSON.parse(JSON.stringify(prev));
      newValue.amountEnterTime = time;
      newValue.clientAmount = data.amount;
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

      <form>
        <Input
          register={register}
          required={true}
          errors={errors}
          name="amount"
          title="Enter Amount"
          onChange={onChangeAmount}
          type="number"
          value={currencyConverter(amountValue)}
          preInput='৳'
        />

        {errors.amount?.type === 'required' && <p role="alert" className="text-red-500">Amount must be required</p>}


        <div className="w-full flex justify-between mt-8">
          <Button onClick={() => navigate('/date-time-select')} title="Back" />
          <Button onClick={handleSubmit(onSubmit)} title="Next" />
        </div>
      </form>
    </BodyLayout>
  );
};

export default EnterAmount;