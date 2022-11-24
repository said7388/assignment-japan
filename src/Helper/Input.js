import React from 'react';

const Input = ({
  register,
  name,
  errors,
  title,
  required = false,
  preInput = "",
  type = "text",
  ...rest
}) => {

  const { disabled } = { ...rest };

  if (type === "radio") {
    return (
      <div className="flex items-center mb-4">
        <input
          type="radio"
          id="country-option"
          value={title}
          className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
          {...register(name)}
          {...rest}
        />
        <label
          htmlFor="country-option"
          className="block ml-2 text-base font-medium text-gray-900">
          {title}
        </label>
      </div>
    )
  }

  if (!!disabled) {
    return (
      <div className="w-full my-3  relative flex flex-col items-start justify-center">
        <label
          className="text-left py-1 text-base font-medium uppercase"
        >{title}</label>
        <input
          className=" bg-gray-200 border border-gray-400 text-gray-900  rounded-lg  block w-full px-2.5 py-1"
          {...rest}
        />
      </div>
    )
  }

  return (
    <div className="w-full my-3  relative flex flex-col items-start justify-center">
      <label
        className="text-left py-2 text-base font-medium uppercase"
        htmlFor={name}
      >{title}</label>
      {preInput && <span className="absolute top-11 text-2xl font-bold left-2">{preInput}</span>}
      <input
        className={` ${preInput && "text-right"} bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 text-base focus:border-blue-500 block w-full px-2.5 py-1.5 `}
        type={type}
        {...register(name, { required })}
        aria-invalid={errors[name] ? "true" : "false"}
        {...rest}
      />
    </div>
  )
};

export default Input;