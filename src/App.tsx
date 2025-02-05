import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleGenerativeAI } from "@google/generative-ai";
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Tasks from './pages/Tasks';
import Rank from './pages/Rank';
import Cityscape from './pages/Cityscape';
import Streak from './pages/Streak';


function App() {
    return (
      <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/streak" element={<Streak />} />
        <Route path="/cityscape" element={<Cityscape />} />
        <Route path="/rank" element={<Rank />} />
      </Routes>
    </Router>
    );
}

export default App;