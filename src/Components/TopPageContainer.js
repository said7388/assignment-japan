import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { topTitleState } from '../atoms/atoms';
import BodyLayout from '../Layout/BodyLayout';

const TopPageContainer = () => {
  const setTitleState = useSetRecoilState(topTitleState);


  useEffect(() => {
    setTitleState("Top")
  }, [setTitleState]);

  return (
    <BodyLayout>
      <h1>Top Page</h1>
    </BodyLayout>
  );
};

export default TopPageContainer;