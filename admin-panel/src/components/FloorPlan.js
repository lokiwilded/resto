// src/components/FloorPlan.js
import React, { useState } from 'react';

const FloorPlan = () => {
  const [grid, setGrid] = useState(new Array(1500).fill(null)); // 50x30 grid = 1500 squares
  const [combinable, setCombinable] = useState(false);

  const handleClick = (index) => {
    const newGrid = [...grid];
    newGrid[index] = { number: index + 1, seats: 2, combinable }; // Assign a table with 2 seats by default
    setGrid(newGrid);
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <label>
          <input
            type="checkbox"
            checked={combinable}
            onChange={() => setCombinable(!combinable)}
          />
          Combinable
        </label>
      </div>
      <div className="w-full h-96 overflow-auto p-4 border border-gray-300 bg-gray-100 rounded-lg">
        <div className="grid grid-cols-50 gap-1">
          {grid.map((table, index) => (
            <div
              key={index}
              className={`w-12 h-12 border ${table ? 'bg-blue-300' : 'bg-gray-200'}`}
              onClick={() => handleClick(index)}
            >
              {table && <p className="text-center">{`Table ${table.number}`}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FloorPlan;
