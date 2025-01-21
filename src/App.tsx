import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleGenerativeAI } from "@google/generative-ai";
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
    return (
      <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
    );
}

export default App;