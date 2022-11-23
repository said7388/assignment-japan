import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { topTitleState } from '../helper/atoms';
import BodyLayout from '../Layout/BodyLayout';
import Input from '../Layout/Input';
import '../styles/TopPage.css';

const TopPageContainer = () => {
  const setTitleState = useSetRecoilState(topTitleState);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data)
  };

  const handleMakeReservations = () => {
    navigate("/personal-info");
  }

  useEffect(() => {
    setTitleState("Top")
  }, [setTitleState]);

  return (
    <BodyLayout>
      <div className="top-page-content">
        <div className="new-reservation">
          <button className="new-reservation-btn"
            onClick={handleMakeReservations}>Make new reservation</button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input type="text" register={register} title="Reservation ID" name="search" />
          <div className="button-container">
            <button type="submit" className="submit-btn">Search</button>
          </div>
        </form>
      </div>
    </BodyLayout>
  );
};

export default TopPageContainer;