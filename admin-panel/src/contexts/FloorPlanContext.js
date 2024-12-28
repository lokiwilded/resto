import React, { createContext, useState } from 'react';

export const FloorPlanContext = createContext();

export const FloorPlanProvider = ({ children }) => {
  const [floorPlans, setFloorPlans] = useState([]);

  return (
    <FloorPlanContext.Provider value={{ floorPlans, setFloorPlans }}>
      {children}
    </FloorPlanContext.Provider>
  );
};