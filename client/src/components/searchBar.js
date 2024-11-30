import React, { useState } from "react";

function SearchBar(param) {
  const [searchProfiles, setSearchProfile] = useState("");

  async function fetchProfiles() {
    const urlQuery = {
      email: param.email,
      searchProfiles: searchProfiles,
    };
    try {
      const response = await fetch("/getProfiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(urlQuery),
      });

      const result = await response.json();
      console.log(result);
      param.updateData(result.response);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  }

  const handleInputChange = (event) => {
    setSearchProfile(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchProfiles}
        onChange={handleInputChange}
      />
      <button type="submit" onClick={fetchProfiles}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
