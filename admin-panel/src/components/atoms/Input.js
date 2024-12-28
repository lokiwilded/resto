import React from 'react';

export default function Input({ value, onChange, placeholder, type = 'text', className }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`p-2 border border-gray-300 rounded ${className}`}
    />
  );
}