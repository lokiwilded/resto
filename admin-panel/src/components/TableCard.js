// src/components/TableCard.js
import React, { useState } from 'react';
import BookingForm from './BookingForm';

const TableCard = ({ table }) => {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(!showForm);
  };

  return (
    <div
      className={`w-12 h-12 border flex items-center justify-center ${table.combinable ? 'bg-green-500' : 'bg-gray-500'} cursor-pointer`}
      onClick={handleClick}
    >
      <span className="text-white">{table.number}</span>
      {showForm && <BookingForm table={table} />}
    </div>
  );
};

export default TableCard;
