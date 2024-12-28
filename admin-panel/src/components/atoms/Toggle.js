import React from 'react';

export default function Toggle({ checked, onChange, label }) {
  return (
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="toggle-input"
      />
      <span>{label}</span>
    </label>
  );
}