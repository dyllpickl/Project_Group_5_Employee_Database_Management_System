import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/homePage';
import Login from './components/loginPage';
import ProfileView from './components/profileView';
import EditProfile from './components/editProfile';
import './styles.css';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfileView />} />
        <Route path='/editProfile' element={<EditProfile />} />
      </Routes>
    </div>

  );
}

export default App;