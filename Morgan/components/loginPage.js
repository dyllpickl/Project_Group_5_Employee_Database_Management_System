import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/user-profile', credentials); 
            console.log("Logging in with: ", username, password);
        } catch(error) {
            console.error("Login Error:", error);
        }  
    };

  return (
    <div>
        <form onSubmit={handleLogin} className="login-form">
        <div> 
            <input 
                type="text" 
                id="username" 
                value={username} 
                placeholder="Username" 
            />
            <input
                type="password"
                id="password"
                value={password} 
                placeholder="Password" 
                />
            <button type="submit">Login</button>
        </div>
        </form>
    </div>
  )
}

export default Login;