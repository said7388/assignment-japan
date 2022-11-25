import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import BodyLayout from '../Helper/BodyLayout';
import Button from '../Helper/Button';
import { clientDataState } from '../store/atoms';
import { destination } from '../utils/data';
import { japaniLocalization } from '../utils/timeFormate';

const Confirmation = () => {
  const [language, setLanguage] = useState('BD');
  const navigate = useNavigate();
  const allData = useRecoilValue(clientDataState);
  const { loginTime, personalInfoTime, destinationEnterTime, clientName, dateTimeEnterTime, amountEnterTime, clientNote, noteEnterTime, clientGender, fromDestination, toDestination, clientDate, clientTime, clientAmount } = useRecoilValue(clientDataState);

  const intl = useIntl();


  const fromCityName = destination.find(c => c.id === fromDestination)
  const toCityName = destination.find(c => c.id === toDestination)


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

  const timeData = [
    {
      title: 'Login time',
      jpTitle: "ログイン時間",
      time: timeFormatter(loginTime),
    },
    {
      title: 'Personal information time',
      jpTitle: "個人情報入力時間",
      time: timeFormatter(personalInfoTime),
    },
    {
      title: 'From to enter time',
      jpTitle: 'から 時刻を入力してください',
      time: timeFormatter(destinationEnterTime)
    },
    {
      title: 'Date Time enter time',
      jpTitle: "日付 時刻 時刻を入力してください",
      time: timeFormatter(dateTimeEnterTime)
    },
    {
      title: "Amount enter time",
      jpTitle: "金額入力時間",
      time: timeFormatter(amountEnterTime)
    },
    {
      title: 'Note enter time',
      jpTitle: "入力時間に注意",
      time: timeFormatter(noteEnterTime)
    }
  ];

  const clientData = [
    {
      title: "Name",
      jpTitle: "名前",
      value: clientName
    },
    {
      title: 'Gender',
      jpTitle: "性別",
      value: clientGender
    },
    {
      title: 'From',
      jpTitle: "から",
      value: language === "BD" ? fromCityName.name : fromCityName.ja
    },
    {
      title: 'To',
      jpTitle: "に",
      value: language === "BD" ? toCityName.name : toCityName.ja
    },
    {
      title: 'Date',
      jpTitle: "日にち",
      value: intl.formatDate(clientDate, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      })
    },
    {
      title: 'Time',
      jpTitle: "時間",
      value: intl.formatDate(clientTime, {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
      })
    },
    {
      title: "Amount(JPY)",
      jpTitle: "金額(円)",
      value: clientAmount
    },
  ];

  console.log(allData)


  return (
    <BodyLayout>

      <div className="w-full flex justify-end rounded-md" role="group">
        <button
          type="button"
          onClick={() => setLanguage("BD")}
          className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 "
        >
          BD
        </button>

        <button
          type="button"
          onClick={() => setLanguage("JP")}
          className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-r-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 "
        >
          JP
        </button>
      </div>

      <div className="mb-16">
        {
          timeData.map((data, i) => (
            <p key={i} className="text-base">
              <span className="font-medium">{language === "BD" ? data.title : data.jpTitle}</span> : {data.time}
            </p>
          ))
        }
      </div>

      <div className="mb-16">
        {
          clientData.map((data, i) => (
            <p key={i} className="text-base">
              <span className="font-medium">{language === "BD" ? data.title : data.jpTitle}</span> : {data.value}
            </p>
          ))
        }
      </div>

      <p className="p-5 border bg-gray-400">{clientNote}</p>


      <div className="w-full flex justify-between mt-8">
        <Button onClick={() => navigate('/enter-note')} title="Back" />
        <Button title="Next" />
      </div>
    </BodyLayout>
  );
};

export default Confirmation;