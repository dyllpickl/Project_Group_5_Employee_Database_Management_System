import React, { useState } from 'react';

function SearchBar({ data, onSearch }) {
  const [searchProfiles, setSearchProfile] = useState('');

  const handleInputChange = (event) => {
    setSearchProfile(event.target.value);
    onSearch(event.target.value); 
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchProfiles}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default SearchBar;