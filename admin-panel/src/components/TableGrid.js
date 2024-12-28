import React, { useState, useEffect } from 'react';

// Mock backend data
const getBookedTables = () => [
  { tableNumber: 1, name: 'John Doe', phone: '123-456-7890', time: '7:00 PM' },
  { tableNumber: 2, name: 'Jane Smith', phone: '987-654-3210', time: '6:30 PM' },
  // Add more bookings for testing
];

export default function TableGrid() {
  const rows = 12;  // Number of rows
  const columns = 12;  // Number of columns
  const totalCells = rows * columns;  // Total number of cells

  const cellSize = 70;  // Size of each cell
  const gapSize = 2;  // Gap between cells in Tailwind spacing units

  const [selectedCell, setSelectedCell] = useState(null); // Track the selected cell
  const [cellDetails, setCellDetails] = useState({
    name: '',
    phone: '',
    time: ''
  }); // Track cell details for the pop-up
  const [bookedTables, setBookedTables] = useState([]);  // Track booked tables
  const [searchQuery, setSearchQuery] = useState(''); // Track search query
  const [searchResult, setSearchResult] = useState(null); // Track search result
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false); // Track if search modal is open

  // Fetch booked table data from backend
  useEffect(() => {
    const bookedTablesData = getBookedTables();
    setBookedTables(bookedTablesData);
  }, []);

  // Handle searching for a customer
  const handleSearch = () => {
    const result = bookedTables.find(
      (table) => table.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                table.phone.includes(searchQuery)
    );
    setSearchResult(result);
    setIsSearchModalOpen(true);

    // Automatically close the search result pop-up after 5 seconds
    setTimeout(() => {
      setIsSearchModalOpen(false);
      setSearchResult(null);
    }, 5000);
  };

  // Handle clicking a cell
  const handleCellClick = (index) => {
    const tableNumber = index + 1;
    const bookedTable = bookedTables.find((table) => table.tableNumber === tableNumber);

    if (bookedTable) {
      setCellDetails(bookedTable);  // Show the booked table details
    } else {
      setCellDetails({
        name: '',
        phone: '',
        time: ''
      });
    }

    setSelectedCell(tableNumber);  // Set the selected table
  };

  // Handle closing the popup
  const handleClosePopup = () => {
    setSelectedCell(null); // Close the pop-up by resetting the selected cell
  };

  // Handle resetting the cell details (for booked tables)
  const handleResetCell = () => {
    const updatedBookedTables = bookedTables.filter(
      (table) => table.tableNumber !== selectedCell
    );
    setBookedTables(updatedBookedTables);
    setCellDetails({
      name: '',
      phone: '',
      time: ''
    });
    setSelectedCell(null); // Close the popup after reset
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCellDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handle booking a new table (if it's available)
  const handleBookTable = () => {
    if (selectedCell && !cellDetails.name) {
      alert('Please enter customer details to book this table.');
      return;
    }
    const newBooking = {
      tableNumber: selectedCell,
      name: cellDetails.name,
      phone: cellDetails.phone,
      time: cellDetails.time
    };
    setBookedTables([...bookedTables, newBooking]);
    setSelectedCell(null); // Close the popup after booking
  };

  // Close search result manually
  const handleCloseSearchModal = () => {
    setIsSearchModalOpen(false);
    setSearchResult(null);
  };

  return (
    <div className="flex flex-col items-center mt-4">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name or phone"
          className="p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleSearch}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* Table Grid */}
      <div className="grid grid-cols-12 gap-2">
        {new Array(totalCells).fill(null).map((_, index) => {
          const tableNumber = index + 1;
          const bookedTable = bookedTables.find((table) => table.tableNumber === tableNumber);
          return (
            <div
              key={index}
              onClick={() => handleCellClick(index)}  // Click to select the cell
              style={{
                height: `${cellSize}px`,
                width: `${cellSize}px`,
                backgroundColor: bookedTable ? '#FF5733' : '#ddd',  // Red for booked, gray for available
                border: '1px solid #bbb',  // Border for separation
                cursor: 'pointer',
              }}
              className="transition-colors"
            />
          );
        })}
      </div>

      {/* Pop-up modal when a cell is clicked */}
      {selectedCell !== null && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            {/* If booked, show reset button */}
            {cellDetails.name && (
              <button
                onClick={handleResetCell}
                className="absolute top-2 right-2 text-red-500"
              >
                Reset
              </button>
            )}

            <h3 className="text-xl font-bold mb-4">Table {selectedCell}</h3>
            <form>
              <div className="mb-4">
                <label className="block mb-2">Customer Name</label>
                <input
                  type="text"
                  name="name"
                  value={cellDetails.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter Customer Name"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={cellDetails.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter Phone Number"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Booking Time</label>
                <input
                  type="text"
                  name="time"
                  value={cellDetails.time}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter Time"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleClosePopup}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Close
                </button>
                {!cellDetails.name && (
                  <button
                    type="button"
                    onClick={handleBookTable}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Book Table
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search Result Pop-up */}
      {isSearchModalOpen && searchResult && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <button
              onClick={handleCloseSearchModal}
              className="absolute top-2 right-2 text-red-500"
            >
              Close
            </button>
            <h3 className="text-xl font-bold mb-4">Search Result</h3>
            <p><strong>Found:</strong> Table {searchResult.tableNumber}</p>
            <p><strong>Name:</strong> {searchResult.name}</p>
            <p><strong>Phone:</strong> {searchResult.phone}</p>
            <p><strong>Time:</strong> {searchResult.time}</p>
          </div>
        </div>
      )}
    </div>
  );
}
