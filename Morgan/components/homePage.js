import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home () {

    const navigate = useNavigate();

    function loginClick() {
        navigate("/login")
        console.log("Login Clicked")
    };
  
    return (
        <div className="main-home-page">
            <h1>Welcome</h1>
                <p>Please enter your credentials</p>
                <div className="center">
                    <button 
                    className="universal-button" 
                    onClick={loginClick}>Login
                    </button>
                </div>

        </div>
    
)
}

export default Home;