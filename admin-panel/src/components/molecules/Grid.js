import React from 'react';
import GridCell from '../atoms/GridCell';

export default function Grid({ rows, columns, selectedCells, bookedCells, onCellClick }) {
  const totalCells = rows * columns;

  return (
    <div className={`grid grid-cols-${columns} gap-1`}> {/* Adjust gap as needed */}
      {new Array(totalCells).fill(null).map((_, index) => {
        const isBooked = bookedCells.includes(index);
        const isSelected = selectedCells.includes(index);

        return (
          <GridCell
            key={index}
            isBooked={isBooked}
            isSelected={isSelected}
            onClick={() => onCellClick(index)}
          />
        );
      })}
    </div>
  );
}