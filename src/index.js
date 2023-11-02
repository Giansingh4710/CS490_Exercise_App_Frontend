import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import OtherRandomPage from "./pages/Other";
import Sidebar from "./components/Sidebar/Sidebar";
import MyCoaches from "./components/MyCoach/MyCoach";
import ExploreCoaches from "./components/ExploreCoaches/ExploreCoaches";

function App() {
  return (
    <BrowserRouter>
      <main>
        {/* we will need to add logic here to determine whether a user is logged 
        in, if they are logged in, show sidebar, if not show landing page */}
        <Sidebar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/other" element={<OtherRandomPage />} />
          <Route path="/MyCoaches" element={<MyCoaches />} />
          <Route path="/ExploreCoaches" element={<ExploreCoaches />} />
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
