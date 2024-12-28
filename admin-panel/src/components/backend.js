export const getBookedTables = () => {
    return [
      { tableNumber: 1, name: 'John Doe', phone: '123-456-7890', time: '7:00 PM' },
      { tableNumber: 4, name: 'Jane Smith', phone: '987-654-3210', time: '6:30 PM' },
      // Add more booked tables here
    ];
  };
  
  export const bookTable = (tableNumber, details) => {
    // Simulate adding booking data to the "database"
    return { tableNumber, ...details };
  };
  