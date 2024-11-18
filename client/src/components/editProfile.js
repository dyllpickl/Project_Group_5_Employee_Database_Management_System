import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function EditProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const [first_name, setFirst] = useState("");
  const [last_name, setLast] = useState("");
  const [ssn, setSsn] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setNumber] = useState("");

  const return_email = queryParams.get("current_email");
  const profile_id = queryParams.get("profile_id");

  useEffect(() => {
    setFirst(queryParams.get("first_name") || "");
    setLast(queryParams.get("last_name") || "");
    setSsn(queryParams.get("ssn") || "");
    setEmail(queryParams.get("email") || "");
    setNumber(queryParams.get("phone_number") || "");
  }, [queryParams]);

  const handleForm = async (event) => {
    event.preventDefault();

    const postData = {
      id: profile_id,
      first_name:first_name,
      last_name:last_name,
      ssn:ssn,
      email:email,
      phone_number:phone_number,
    };

    try {
      const response = await fetch("/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      const data = await response.json();
      console.log(data);

      navigate(`/profile?email=${return_email}`);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="mb-4 mt-4">Edit Profile</h1>
      <div className="card-body">
        <form onSubmit={handleForm}>
          <div className="form-group mb-4">
            <label htmlFor="first_name" className="form-label">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              className="form-control"
              value={first_name}
              onChange={(e) => setFirst(e.target.value)}
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="last_name" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              className="form-control"
              value={last_name}
              onChange={(e) => setLast(e.target.value)}
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="ssn" className="form-label">
              SSN
            </label>
            <input
              type="text"
              id="ssn"
              className="form-control"
              value={ssn}
              onChange={(e) => setSsn(e.target.value)}
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="phone_number" className="form-label">
              Phone Number
            </label>
            <input
              type="text"
              id="phone_number"
              className="form-control"
              value={phone_number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
