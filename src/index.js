import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from './pages/LandingPage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage'
import SurveyPage from './pages/SurveyPage'
import UserDashboard from './pages/UserDashboard';
import OtherRandomPage from "./pages/Other";
import Sidebar from "./components/Sidebar/Sidebar";
import MyCoach from "./components/MyCoach/MyCoach";
import ExploreCoaches from "./components/ExploreCoaches/ExploreCoaches";


function App() {
  return (
    <BrowserRouter>
     <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Register" element={<RegistrationPage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Register/Survey" element={<SurveyPage />} />
          <Route path="/UserDashboard" element={<UserDashboard />} />
          <Route path="/other" element={<OtherRandomPage />} />
          <Route path="/MyCoach" element={<MyCoach />} />
          <Route path="/ExploreCoaches" element={<ExploreCoaches />} />

          {/* we will need to add logic here to determine whether a user is logged 
          in, if they are logged in, show sidebar, if not show landing page */}
          <Sidebar />
         </Routes>
      </main>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
