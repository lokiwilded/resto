import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = () => {
    axios.get(`http://localhost:5000/api/search/${query}`)
      .then(response => setResult(response.data))
      .catch(error => console.error(error));
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 border rounded"
        placeholder="Search by name"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded">Search</button>

      {result && (
        <div className="mt-4">
          <p>Customer: {result.name}</p>
          <p>Table: {result.table}</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
