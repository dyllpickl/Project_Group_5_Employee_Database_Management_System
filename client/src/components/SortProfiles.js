import React from "react";

function SortProfiles( param ) {

  async function fetchProfiles( order ) {
    const urlQuery = {
      email:param.email,
      sortedDisplay:order,
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
      param.updateData(result);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } 
  }

  const setDescending = () => {
    fetchProfiles("descending");
  };

  const setAscending = () => {
    fetchProfiles("ascending");
  };

  return (
    <div>
      <p>Sort Profiles:</p>
      <button
        onClick={setDescending}
        className="btn btn-secondary"
        style={{ marginRight: "10px" }}
      >
        Name Descending (Z-A)
      </button>
      <button
        onClick={setAscending}
        className="btn btn-secondary"
        style={{ marginRight: "10px" }}
      >
        Name Ascending (A-Z)
      </button>
    </div>
  );
}

export default SortProfiles;
