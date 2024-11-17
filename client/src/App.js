import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/homePage';
import Login from './components/loginPage';
import './styles.css';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>

  );
}

export default App;