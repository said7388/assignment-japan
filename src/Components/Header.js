import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { clientDataState } from '../store/atoms';

const Header = () => {
  const { clientName, fromDestination, toDestination } = useRecoilValue(clientDataState);
  const [headerTitle, setHeaderTitle] = useState('');
  const location = useLocation();


  const pathname = location.pathname;

  useEffect(() => {
    switch (pathname) {
      case "/enter-note":
        setHeaderTitle(`${clientName} : Enter Note`);
        break;
      case "/top":
        setHeaderTitle("Top");
        break;
      case "/personal-info":
        setHeaderTitle("Personal Information");
        break;
      case "/destination-select":
        setHeaderTitle(`${clientName} : From to Selection`);
        break;
      case "/date-time-select":
        setHeaderTitle(`${fromDestination?.name} > ${toDestination?.name} : Date Time Selection`);
        break;
      case "/enter-amount":
        setHeaderTitle(`${clientName} : How much do you pay ?`);
        break;
      case "/final-confirm":
        setHeaderTitle(`${clientName} : Final Confirmation`);
        break;
      case "/error":
        setHeaderTitle("Error!!");
        break;
      case "/success":
        setHeaderTitle(`${clientName} : Reservation ID`);
        break;
      default:
        setHeaderTitle('Login')
    }
  },
    [clientName, fromDestination, pathname, setHeaderTitle, toDestination]
  );

  return (
    <div className="w-full h-20 bg-[#deeaf6] flex items-center justify-center sticky shadow-md ">
      <h1 className="text-3xl font-bold">{headerTitle}</h1>
    </div>
  );
};

export default Header;