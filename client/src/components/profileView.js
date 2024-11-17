import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./header";
import Profile from "./profile";

function ProfileView(param) {
  const [data, setData] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  useEffect(() => {
    getProfiles();
  });

  const getProfiles = () => {
    fetch("/getProfiles", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then((response) => response.json())
      .then((data) => setData(data));
  };

  return (
    <div>
      <Header />
      {typeof data.responce === "undefined" ? (
        <p>No profiles to display.</p>
      ) : (
        data.responce.map((profile, profileIdentifier) => (
          <Profile
            key={profileIdentifier}
            first_name={profile.first_name}
            last_name={profile.last_name}
            profile_type={profile.profile_type}
            ssn={profile.ssn}
            email={profile.email}
            phone_number={profile.phone_number}
            profile_id={profile.profile_id}
          />
        ))
      )}
    </div>
  );
}

export default ProfileView;
