import React from "react";
import DeleteButton from "./DeleteButton";
import UpdateButton from "./UpdateButton";

function Profile (param) {

    return (
        <div class="card mb-5">
            <div class="card-body">
            <p>Employee Name: {param.first_name} {param.last_name} </p>
                    <p>Profile Type : { param.profile_type } </p>
                    <p>SSN          : { param.ssn } </p>
                    <p>Email        : { param.email} </p>
                    <p>Phone Number : {param.phone_number} </p>

                    <div class="btn-toolbar">
                        <UpdateButton
                         first_name={param.first_name}
                         last_name={param.last_name}
                         ssn={param.ssn}
                         email={param.email}
                         phone_number={param.phone_number}
                         profile_id={param.profile_id}
                         />
                        <DeleteButton 
                         profile_id = {param.profile_id}/>
                    </div>
            </div>
        </div>
    )
};

export default Profile;