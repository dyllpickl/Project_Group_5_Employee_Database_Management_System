/* Basic two buttons for sorting profiles: Name Descending or Ascending
Depending on button, set sortedDisplay accordingly

Wasn't sure on how to export sortedDisplay.  I was thinking of passing 
it alongside {email} within profileView.js so it can be added to the 
/getProfiles FETCH request */

import React, { useState } from "react";

function SortProfiles() {
  const [sortedDisplay, setSortedDisplay] = useState("");

  const setDescending = () => {
    setSortedDisplay("descending");
    console.log("sortedDisplay: descending");
  };

  const setAscending = () => {
    setSortedDisplay("ascending");
    console.log("sortedDisplay: ascending");
  };

  return (
    <div>
      <p>Sort Profiles:</p>
      <button
        onClick={setDescending}
        className="btn btn-secondary"
        style={{ marginRight: "10px" }}
      >
        Name Descending (A-Z)
      </button>
      <button
        onClick={setAscending}
        className="btn btn-secondary"
        style={{ marginRight: "10px" }}
      >
        Name Ascending (Z-A)
      </button>
    </div>
  );
}

export default SortProfiles;
