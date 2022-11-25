import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import BodyLayout from '../Helper/BodyLayout';
import Button from '../Helper/Button';
import Input from '../Helper/Input';
import { clientDataState } from '../store/atoms';
import { japaniLocalization } from '../utils/timeFormate';


const DateTimeSelect = () => {
  const { loginTime, personalInfoTime, destinationEnterTime } = useRecoilValue(clientDataState);
  const [startTime, setStartTime] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const setClientDataState = useSetRecoilState(clientDataState);
  const navigate = useNavigate();
  const intl = useIntl()

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


  const jpLoginTime = timeFormatter(loginTime)

  const jpPersonalEnterTime = timeFormatter(personalInfoTime)

  const jpFromToEnterTime = timeFormatter(destinationEnterTime)


  const handleSubmitDateTime = () => {
    const time = new Date().toISOString();

    setClientDataState((prev) => {
      const newValue = JSON.parse(JSON.stringify(prev));
      newValue.dateTimeEnterTime = time;
      newValue.clientTime = startTime;
      newValue.clientDate = startDate;
      return newValue;
    })

    navigate("/enter-amount");
  }


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

      <div className="my-5">
        <h3 className="text-base font-medium uppercase pb-4">Date</h3>
        <DatePicker
          dateFormat="yyyy/MM/dd"
          className="py-2 px-3 w-full rounded"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </div>
      <div className="my-5">
        <h3 className="text-base font-medium uppercase pb-4">Time</h3>
        <DatePicker
          selected={startTime}
          onChange={(time) => setStartTime(time)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          className="py-2 px-3 w-full rounded"
          timeCaption="Time"
          dateFormat="HH:mm"
          timeFormat="HH:mm"
        />
      </div>
      <div className="w-full flex justify-between mt-8">
        <Button onClick={() => navigate('/destination-select')} title="Back" />
        <Button onClick={handleSubmitDateTime} title="Next" />
      </div>
    </BodyLayout>
  );
};

export default DateTimeSelect;