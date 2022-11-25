import React from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import BodyLayout from '../Helper/BodyLayout';
import Button from '../Helper/Button';
import Input from '../Helper/Input';
import { clientDataState } from '../store/atoms';
import { defaultNote } from '../utils/data';
import { japaniLocalization } from '../utils/timeFormate';


const EnterNote = () => {
  const setClientDataState = useSetRecoilState(clientDataState);
  const { loginTime, personalInfoTime, destinationEnterTime, dateTimeEnterTime, amountEnterTime } = useRecoilValue(clientDataState);
  const navigate = useNavigate();
  const intl = useIntl();
  const { register, handleSubmit } = useForm();


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

  const onSubmit = (data) => {
    const time = new Date().toISOString();

    setClientDataState((prev) => {
      const newValue = JSON.parse(JSON.stringify(prev));
      newValue.noteEnterTime = time;
      newValue.clientNote = data.note;
      return newValue;
    })

    navigate("/final-confirm");
  }

  const jpLoginTime = timeFormatter(loginTime)

  const jpPersonalEnterTime = timeFormatter(personalInfoTime)

  const jpFromToEnterTime = timeFormatter(destinationEnterTime)

  const jpDateTimeEnterTime = timeFormatter(dateTimeEnterTime);

  const jpAmountEnterTime = timeFormatter(amountEnterTime);



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

      <Input
        value={jpAmountEnterTime}
        title="Amount Enter Time"
        disabled
      />

      <form>
        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 ">Note</label>
        <textarea
          id="message"
          rows="10"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Leave a comment..."
          defaultValue={defaultNote}
          {...register("note")}
        />

        <div className="w-full flex justify-between mt-8">
          <Button onClick={() => navigate('/enter-amount')} title="Back" />
          <Button onClick={handleSubmit(onSubmit)} title="Next" />
        </div>
      </form>
    </BodyLayout>
  );
};

export default EnterNote;