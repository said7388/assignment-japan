import React from 'react';

const BodyLayout = ({ children }) => {
  return (
    <div className="w-[1246px] overflow-auto shadow-lg h-[80vh] lg:px-48 py-8 px-24 bg-[#e2efd9] mx-auto border">
      {children}
    </div>
  );
};

export default BodyLayout;