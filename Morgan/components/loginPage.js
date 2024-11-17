import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/user-profile', credentials); 
            console.log("Logging in with: ", response.data);
        } catch(error) {
            console.error("Login Error:", error);
        }  
    };

  return (
    <div>
        <div className="left">
            <form className="intro-container" onSubmit={handleLogin}>
                <h1>Welcome</h1>
                    <p>Please enter your credentials</p>
                <div> 
                    <input 
                        type="text" 
                        id="username" 
                        onChange={handleChange}
                        placeholder="Username" 
                    />
                    <input
                        type="password"
                        id="password"
                        onChange={handleChange}
                        placeholder="Password" 
                    />
                    <div className="button-wrapper">
                        <button type="submit" className="universal-button">Login</button>
                    </div>
               
                </div>
            </form>
        </div>

        <div className="right">
            <div className="puzzle-img"></div>
        </div>
    </div>
  )
}

export default Login;