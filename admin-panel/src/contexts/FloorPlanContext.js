import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const FloorPlanContext = createContext();

export const FloorPlanProvider = ({ children }) => {
  const [floorPlans, setFloorPlans] = useState([]);

  useEffect(() => {
    const fetchFloorPlans = async () => {
      try {
        const { data } = await axios.get('/api/floor-plans');
        setFloorPlans(data);
      } catch (err) {
        console.error('Error fetching floor plans:', err);
      }
    };

    fetchFloorPlans();
  }, []);

  return (
    <FloorPlanContext.Provider value={{ floorPlans, setFloorPlans }}>
      {children}
    </FloorPlanContext.Provider>
  );
};
