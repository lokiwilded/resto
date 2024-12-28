// src/components/BookingForm.js
import React, { useState } from 'react';

const BookingForm = ({ table }) => {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking submitted:', { table, name, time, phone });
    // Here you can send the data to the backend for saving the booking
  };

  return (
    <div className="absolute bg-white p-4 shadow-lg w-64">
      <h2 className="text-lg font-semibold">Booking for Table {table.number}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Customer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 mt-2"
          required
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border p-2 mt-2"
          required
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full border p-2 mt-2"
          required
        />
        <button type="submit" className="w-full mt-4 bg-blue-500 text-white p-2 rounded">Book Table</button>
      </form>
    </div>
  );
};

export default BookingForm;
