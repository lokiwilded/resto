import React from 'react';
import { FloorPlanProvider } from './contexts/FloorPlanContext';
import FloorPlanManager from './components/organisms/FloorPlanManager';

function App() {
  return (
    <FloorPlanProvider>
      <div className="h-screen flex">
        <FloorPlanManager />
      </div>
    </FloorPlanProvider>
  );
}

export default App;