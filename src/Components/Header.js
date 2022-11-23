import React from 'react';
import { useRecoilValue } from 'recoil';
import { topTitleState } from '../helper/atoms';
import '../styles/Header.css';

const Header = () => {
  const title = useRecoilValue(topTitleState);

  return (
    <div className="header">
      <h1>{title}</h1>
    </div>
  );
};

export default Header;