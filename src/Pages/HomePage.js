import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Components/Header';

const HomePage = () => {
  
  return (
    <div className="App">
      <Header />
      <div className="body-section">
        <Outlet />
      </div>
    </div>
  );
};

export default HomePage;