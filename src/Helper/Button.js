import React from 'react';

const Button = ({ title, ...rest }) => {
  return (
    <div>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-2.5 text-center"
        {...rest}>{title}</button>
    </div>
  );
};

export default Button;