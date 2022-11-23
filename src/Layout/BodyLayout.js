import React from 'react';
import '../styles/BodyLayout.css';

const BodyLayout = ({ children }) => {
  return (
    <div className="body-layout">
      {children}
    </div>
  );
};

export default BodyLayout;