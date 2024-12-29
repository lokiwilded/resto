import React, { useState, useContext } from 'react';
import { FloorPlanContext } from '../contexts/FloorPlanContext';
import Sidebar from '../components/organisms/Sidebar';
import TableSetupManager from '../components/organisms/TableSetupManager';

export default function AdminPanel() {
  const { floorPlans, setFloorPlans } = useContext(FloorPlanContext);
  const [selectedFloorPlan, setSelectedFloorPlan] = useState(null);

  const handleCreateFloorPlan = (name) => {
    const newFloorPlan = {
      _id: Date.now().toString(),
      name,
      tables: [],
    };
    setFloorPlans([...floorPlans, newFloorPlan]);
    setSelectedFloorPlan(newFloorPlan);
  };

  const handleSelectFloorPlan = (floorPlan) => {
    setSelectedFloorPlan(floorPlan);
  };

  const handleSaveFloorPlan = (updatedFloorPlan) => {
    const updatedPlans = floorPlans.map((plan) =>
      plan._id === updatedFloorPlan._id ? updatedFloorPlan : plan
    );
    setFloorPlans(updatedPlans);
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        floorPlans={floorPlans}
        onCreateFloorPlan={handleCreateFloorPlan}
        onSelectFloorPlan={handleSelectFloorPlan}
      />
      <div className="flex-grow p-6">
        {selectedFloorPlan ? (
          <TableSetupManager
            floorPlan={selectedFloorPlan}
            onSave={handleSaveFloorPlan}
          />
        ) : (
          <p className="text-center text-gray-600">
            Select or create a floor plan to get started.
          </p>
        )}
      </div>
    </div>
  );
}
