import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import BodyLayout from '../Helper/BodyLayout';
import Button from '../Helper/Button';
import Input from '../Helper/Input';
import { clientDataState, topTitleState } from '../utils/atoms';
import { destination } from '../utils/data';
import { japaniLocalization } from '../utils/timeFormate';

const DestinationSelect = () => {
  const setTitleState = useSetRecoilState(topTitleState);
  const setClientDataState = useSetRecoilState(clientDataState);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { loginTime, clientName, personalInfoTime } = useRecoilValue(clientDataState);
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


  const onSubmit = (data) => {
    const time = new Date().toISOString();

    setClientDataState((prev) => {
      const newValue = JSON.parse(JSON.stringify(prev));
      newValue.destinationEnterTime = time;
      newValue.toDestination = data.to;
      newValue.fromDestination = data.from;
      return newValue;
    })

    navigate("/date-time-select");
  };

  useEffect(() => {
    setTitleState(`${clientName} : From to Selection`)
  }, [setTitleState, clientName]);

  return (
    <BodyLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <div className="my-2">
          <label
            htmlFor="countries"
            className="block mb-2 text-base uppercase font-medium text-gray-900 "
          >
            From
          </label>
          <select
            id="countries"
            defaultValue=""
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            {...register("from", { required: "From Destination is required" })}
            aria-invalid={errors.from ? "true" : "false"}
          >
            <option
              value=""
              disabled></option>
            {
              destination.map((data) => (
                <option
                  key={data.id}
                  value={data.name}>{data.ja}</option>
              ))
            }
          </select>
          {errors.from && <p role="alert" className="text-base py-3 text-red-500 ">{errors.from?.message}</p>}
        </div>

        <div className="my-2">
          <label
            htmlFor="countries"
            className="block mb-2 text-base uppercase font-medium text-gray-900 ">
            To
          </label>
          <select
            id="countries"
            defaultValue=""
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            {...register("to", { required: "To Destination is required" })}
            aria-invalid={errors.to ? "true" : "false"}
          >
            <option
              value=""
              disabled></option>
            {
              destination.map((data) => (
                <option
                  key={data.id}
                  value={data.name}>
                  {data.ja}
                </option>
              ))
            }
          </select>
          {errors.to && <p role="alert" className="text-base py-3 text-red-500 ">{errors.to?.message}</p>}
        </div>

        <div className="w-full flex justify-between mt-8">
          <Button onClick={handleSubmit(() => navigate('/personal-info'))} title="Back" />
          <Button type="submit" title="Next" />
        </div>
      </form>
    </BodyLayout>
  );
};

export default DestinationSelect;