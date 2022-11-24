import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Components/Header';

const HomePage = () => {
  
  return (
    <div className="App">
      <Header />
      <div className="w-full overflow-auto mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default HomePage;