import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function EditProfile() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [first_name, setFirst] = useState(queryParams.get("first_name"));
  const [last_name, setLast] = useState(queryParams.get("last_name"));
  const [ssn, setSsn] = useState(queryParams.get("ssn"));
  const [email, setEmail] = useState(queryParams.get("email"));
  const [phone_number, setNumber] = useState(queryParams.get("phone_number"));
  const profile_id = queryParams.get("profile_id");

  const handleForm = (event) => {
    event.preventDefault();
        let postData = {
            id:profile_id,
            first_name:first_name,
            last_name:last_name,
            ssn:ssn,
            email:email,
            phone_number:phone_number,
        } 
        fetch("/update",{
            method: "put",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(postData)
        }).then(response => response.json()).then(data=>{
            console.log(data);
        })
  };

  return (
    <div class="container">
      <h1 class="mb-4 mt-4">Edit Profile</h1>
      <div class="card-body">
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
