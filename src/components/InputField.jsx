import React from "react";

const InputField = ({
  value,
  onChange,
  type = "text",
  name,
  label,
  disabled,
  placeholder = "",
  errorMessage = "",
  maxDate,
}) => {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        <span className="text-rose-500"> *</span>
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        max={maxDate}
        placeholder={placeholder}
        className="mt-1 p-2 w-full border rounded-md focus:ring-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 disabled:border-gray-600"
      />
      {errorMessage && <p className="text-rose-500">{errorMessage}</p>}
    </div>
  );
};

export default InputField;
