import React from 'react';

const BodyLayout = ({ children }) => {
  return (
    <div className="w-[1246px] shadow-lg h-[70vh] py-8 px-24 bg-[#e2efd9] mx-auto border">
      {children}
    </div>
  );
};

export default BodyLayout;