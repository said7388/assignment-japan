import React from 'react';

const Input = ({ register, name, title, preInput = "", ...rest }) => {


  return (
    <div class="w-full my-3  relative flex flex-col items-start justify-center">
      <label className="text-left py-2 text-base font-medium uppercase" htmlFor={name}>{title}</label>
      {preInput && <span className="absolute top-12 left-2">{preInput}</span>}
      <input className={` ${preInput && "text-right"} bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 text-base focus:border-blue-500 block w-full p-2.5 `} {...register(name)} {...rest} />
    </div>
  )
};

export default Input;