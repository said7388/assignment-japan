import React from 'react';
import { useRecoilValue } from 'recoil';
import { topTitleState } from '../helper/atoms';

const Header = () => {
  const title = useRecoilValue(topTitleState);

  return (
    <div className="w-full h-20 bg-[#deeaf6] flex items-center justify-center sticky shadow-md ">
      <h1 className="text-3xl font-bold">{title}</h1>
    </div>
  );
};

export default Header;