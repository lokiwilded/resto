import React, { useState } from 'react';
import Popup from './Popup';

export default function Sidebar({ floorPlans, onCreateFloorPlan, onSelectFloorPlan }) {
  const [showPopup, setShowPopup] = useState(false);
  const [newFloorPlanName, setNewFloorPlanName] = useState('');

  const handleCreateClick = () => {
    setShowPopup(true);
  };

  const handleSave = () => {
    if (newFloorPlanName.trim()) {
      onCreateFloorPlan(newFloorPlanName.trim());
      setNewFloorPlanName('');
      setShowPopup(false);
    }
  };

  return (
    <div className="w-64 h-full bg-gray-800 text-white flex flex-col">
      <h2 className="text-xl font-bold p-4 border-b border-gray-700">Floor Plans</h2>
      <button
        className="m-4 p-2 bg-blue-500 rounded hover:bg-blue-400"
        onClick={handleCreateClick}
      >
        + New Floor Plan
      </button>
      <ul className="flex-grow overflow-auto">
        {floorPlans.map((plan) => (
          <li
            key={plan._id}
            className="p-4 hover:bg-gray-700 cursor-pointer"
            onClick={() => onSelectFloorPlan(plan)}
          >
            {plan.name}
          </li>
        ))}
      </ul>

      {/* Popup for creating a new floor plan */}
      {showPopup && (
        <Popup
          title="Create New Floor Plan"
          onSave={handleSave}
          onCancel={() => setShowPopup(false)}
        >
          <input
            type="text"
            value={newFloorPlanName}
            onChange={(e) => setNewFloorPlanName(e.target.value)}
            placeholder="Floor Plan Name"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
        </Popup>
      )}
    </div>
  );
}