import React, { useState } from "react";

function AddProfile(param) {
    const [first_name, setFirst] = useState('');
    const [last_name, setLast] = useState('');
    const [ssn, setSsn] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setNumber] = useState('');
    const [profile_type, setType] = useState('');
  
    const handleForm = (event) => {
      event.preventDefault();
          let formData = {
              first_name:first_name,
              last_name:last_name,
              ssn:ssn,
              email:email,
              phone_number:phone_number,
              profile_type:profile_type,
          } 
          fetch("/add",{
              method: "post",
              headers:{
                  "Content-Type":"application/json"
              },
              body:JSON.stringify(formData)
          }).then(response => response.json()).then(data=>{
              setFirst("");
              setLast("");
              setEmail("");
              setNumber("");
              setSsn("");
              setType("");
              param.refreshFunc()
          })
    };
  
    return (
      <div class="container">
        <h1 class="mb-4 mt-4">Add Profile</h1>
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

            <div className="form-group mb-4">
              <label htmlFor="Profile_Type" className="form-label">
                Profile Type
              </label>
              <input
                type="text"
                id="profile_type"
                className="form-control"
                value={profile_type}
                onChange={(e) => setType(e.target.value)}
              />
            </div>
  
            <button type="submit" className="btn btn-primary">
              Submit Profile
            </button>
          </form>
        </div>
      </div>
    );
  }
  
  export default AddProfile;