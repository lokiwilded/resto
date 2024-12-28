import React, { useState, useContext } from 'react';
import { FloorPlanContext } from '../../contexts/FloorPlanContext';
import Sidebar from '../molecules/Sidebar';

export default function FloorPlanManager() {
  const { floorPlans, setFloorPlans } = useContext(FloorPlanContext);
  const [selectedFloorPlan, setSelectedFloorPlan] = useState(null);

  const handleCreateFloorPlan = (name) => {
    const newFloorPlan = { _id: Date.now().toString(), name, tables: [] };
    setFloorPlans([...floorPlans, newFloorPlan]);
    setSelectedFloorPlan(newFloorPlan);
  };

  const handleSelectFloorPlan = (floorPlan) => {
    setSelectedFloorPlan(floorPlan);
  };

  return (
    <div className="flex h-full">
      <Sidebar
        floorPlans={floorPlans}
        onCreateFloorPlan={handleCreateFloorPlan}
        onSelectFloorPlan={handleSelectFloorPlan}
      />
      <div className="flex-grow p-6">
        {selectedFloorPlan ? (
          <h2 className="text-2xl font-bold">{selectedFloorPlan.name}</h2>
        ) : (
          <p>Select or create a floor plan to get started.</p>
        )}
      </div>
    </div>
  );
}
