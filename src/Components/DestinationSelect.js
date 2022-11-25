import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import BodyLayout from '../Helper/BodyLayout';
import Button from '../Helper/Button';
import Input from '../Helper/Input';
import { clientDataState } from '../store/atoms';
import { destination } from '../utils/data';
import { japaniLocalization } from '../utils/timeFormate';

const DestinationSelect = () => {
  const { loginTime,  personalInfoTime, toDestination, fromDestination } = useRecoilValue(clientDataState);
  const [fromCity, setFromCity] = useState(
    destination.filter(d => d.id !== toDestination)
  )
  const [toCity, setToCity] = useState(destination.filter(d => d.id !== fromDestination))
  const setClientDataState = useSetRecoilState(clientDataState);
  const { register, handleSubmit, formState: { errors } } = useForm();

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

  const fromCityOnchange = (e) => {
    const id = e.target.value;
    const filterTo = destination.filter(c => c.id !== id);
    setToCity(filterTo)
  }

  const toCityOnchange = (e) => {
    const id = e.target.value;
    const filterFrom = destination.filter(c => c.id !== id);
    setFromCity(filterFrom)
  }


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

  return (
    <BodyLayout>
      <form>
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
            className="block mb-2 text-base uppercase font-medium text-gray-900 "
          >
            From
          </label>
          <select
            defaultValue={fromDestination || ""}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            {...register("from", { required: "From Destination is required" })}
            onChange={fromCityOnchange}
            aria-invalid={errors.from ? "true" : "false"}
          >
            <option
              value=""
              disabled></option>
            {
              fromCity.map((data) => (
                <option
                  key={data.id}
                  value={data.id}>{data.ja}</option>
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
            defaultValue={toDestination || ""}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            {...register("to", { required: "To Destination is required" })}
            aria-invalid={errors.to ? "true" : "false"}
            onChange={toCityOnchange}
          >
            <option
              value=""
              disabled></option>
            {
              toCity.map((data) => (
                <option
                  key={data.id}
                  value={data.id}>
                  {data.ja}
                </option>
              ))
            }
          </select>
          {errors.to && <p role="alert" className="text-base py-3 text-red-500 ">{errors.to?.message}</p>}
        </div>

        <div className="w-full flex justify-between mt-8">
          <Button onClick={() => navigate('/personal-info')} title="Back" />
          <Button onClick={handleSubmit(onSubmit)} type="submit" title="Next" />
        </div>
      </form>
    </BodyLayout>
  );
};

export default DestinationSelect;