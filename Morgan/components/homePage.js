import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home () {

    const navigate = useNavigate();

    function loginClick() {
        navigate("/login")
        console.log("Login Clicked")
    };
  
    return (
    <div>
        <div className="left">
            <div className="intro-container">
                <h1>Welcome</h1>
                    <p>Please enter your credentials</p>
                        <div className="button-wrapper">
                            <button 
                                className="universal-button" 
                                onClick={loginClick}>Login
                            </button>
                        </div>
            </div>
        </div>

        <div className="right">
            <div className="puzzle-img"></div>
        </div>
    </div>
)
}

export default Home;