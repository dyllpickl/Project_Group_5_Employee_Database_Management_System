import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./header";
import Profile from "./profile";
import AddProfile from "./addProfile";

function ProfileView(param) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  useEffect(() => {
    async function fetchProfiles() {
      try {
        const response = await fetch("/getProfiles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfiles();
  }, [email, refresh]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data || !data.responce || data.responce.length === 0) {
    return (
      <div>
        <Header />
        <p>No profiles to display.</p>
      </div>
    );
  }

  const refreshData = () => {
    setRefresh((prevVal) => prevVal +1);
  };

  return (
    <div>
      <Header />
      {data.responce.length > 1 ? (
        <div>
          <h2>Admin View</h2>
          <AddProfile 
          refreshFunc ={refreshData}/>
        </div>
      ) : (
        <p>Employee View</p>
      )}
      {data.responce.map((profile, profileIdentifier) => (
        <Profile
          key={profileIdentifier}
          first_name={profile.first_name}
          last_name={profile.last_name}
          profile_type={profile.profile_type}
          ssn={profile.ssn}
          email={profile.email}
          phone_number={profile.phone_number}
          profile_id={profile.profile_id}
          refreshFunc={refreshData}
          current_email={email}
        />
      ))}
    </div>
  );
}

export default ProfileView;
