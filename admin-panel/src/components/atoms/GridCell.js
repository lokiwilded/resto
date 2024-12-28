import React from 'react';

export default function GridCell({ isSelected, isBooked, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        height: '50px',
        width: '50px',
        backgroundColor: isBooked ? '#FF5733' : isSelected ? '#ADD8E6' : '#ddd',
        border: '1px solid #bbb',
        cursor: 'pointer',
      }}
      className="transition-colors"
    />
  );
}
