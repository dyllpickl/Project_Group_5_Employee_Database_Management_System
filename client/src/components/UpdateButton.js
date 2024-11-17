import React from "react";
import { useNavigate } from "react-router-dom";

function UpdateButton(param) {
  const navigate = useNavigate();
  const updateProfile = (event) => {
    const queryStr = new URLSearchParams({
      first_name: param.first_name,
      last_name: param.last_name,
      ssn: param.ssn,
      email: param.email,
      phone_number: param.phone_number,
      profile_id: param.profile_id,
    }).toString();
    navigate(`/editProfile?=${queryStr}`);
  };
  return (
    <div>
      <button
        onClick={updateProfile}
        class="btn btn-secondary"
        style={{ marginRight: "10px" }}
      >
        Update
      </button>
    </div>
  );
}

export default UpdateButton;
