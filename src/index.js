import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage'
import SurveyPage from './pages/SurveyPage'
import UserDashboard from './pages/UserDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Register" element={<RegistrationPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Register/Survey" element={<SurveyPage />} />
        <Route path="/UserDashboard" element={<UserDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
