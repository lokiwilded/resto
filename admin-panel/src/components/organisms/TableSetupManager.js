import React, { useState } from 'react';
import Grid from '../molecules/Grid';
import Popup from '../molecules/Popup';

export default function TableSetupManager({ floorPlan, onSave }) {
  const [selectedCell, setSelectedCell] = useState(null);
  const [tableData, setTableData] = useState({
    tableNumber: '',
    seats: '',
    isCombinable: false,
  });
  const [bookedCells, setBookedCells] = useState([]);

  const handleCellClick = (index) => {
    setSelectedCell(index);
    const existingData = floorPlan.tables.find((t) => t.coordinates[0] === index);
    if (existingData) {
      setTableData({
        tableNumber: existingData.tableNumber,
        seats: existingData.seats,
        isCombinable: existingData.isCombinable,
      });
    } else {
      setTableData({ tableNumber: '', seats: '', isCombinable: false });
    }
  };

  const handleSaveTable = () => {
    const updatedFloorPlan = { ...floorPlan };
    const existingTableIndex = updatedFloorPlan.tables.findIndex((t) => t.coordinates[0] === selectedCell);

    const newTableData = {
      tableNumber: tableData.tableNumber,
      seats: Number(tableData.seats),
      isCombinable: tableData.isCombinable,
      coordinates: [selectedCell],
    };

    if (existingTableIndex > -1) {
      updatedFloorPlan.tables[existingTableIndex] = newTableData;
    } else {
      updatedFloorPlan.tables.push(newTableData);
    }

    onSave(updatedFloorPlan);
    setSelectedCell(null);
    setBookedCells([...bookedCells, selectedCell]);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{floorPlan.name}</h2>
      <Grid
        rows={12}
        columns={12}
        selectedCells={[selectedCell]}
        bookedCells={bookedCells}
        onCellClick={handleCellClick}
      />

      {selectedCell !== null && (
        <Popup
          title={`Configure Table ${selectedCell + 1}`}
          onSave={handleSaveTable}
          onCancel={() => setSelectedCell(null)}
        >
          <div>
            <label className="block mb-2">Table Number:</label>
            <input
              type="text"
              value={tableData.tableNumber}
              onChange={(e) => setTableData({ ...tableData, tableNumber: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <label className="block mb-2">Seats:</label>
            <input
              type="number"
              value={tableData.seats}
              onChange={(e) => setTableData({ ...tableData, seats: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <label className="block mb-2">Combinable:</label>
            <input
              type="checkbox"
              checked={tableData.isCombinable}
              onChange={(e) => setTableData({ ...tableData, isCombinable: e.target.checked })}
              className="mb-4"
            />
          </div>
        </Popup>
      )}
    </div>
  );
}
