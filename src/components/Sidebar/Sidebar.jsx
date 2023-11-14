import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <SideBarIcons />
    </div>
  );
}

export function SideBarIcons() {
  return (
    <div className="sidebar-icons">
      <div className="top-sidebar">
        <div className="sidebar-logo">
          <Link to="/">
            <div className="sidebar-icon">
              <span className="material-symbols-outlined">run_circle</span>
              <span className="icon-text"> APP NAME </span>
            </div>
          </Link>
        </div>

        <Link to="/">
          <div className="sidebar-icon dashboard">
            <span className="material-symbols-outlined dashboard">
              desktop_windows
            </span>
            <span className="icon-text"> Dashboard </span>
          </div>
        </Link>
        <Link to="/ExploreCoaches">
          <div className="sidebar-icon">
            <span className="material-symbols-outlined">explore</span>
            <span className="icon-text"> EXPLORE COACHES</span>
          </div>
        </Link>
        <Link to="/MyCoach">
          <div className="sidebar-icon">
            <span className="material-symbols-outlined">group</span>
            <span className="icon-text"> MY COACH </span>
          </div>
        </Link>
        <Link to="/">
          <div className="sidebar-icon">
            <span className="material-symbols-outlined">edit_note</span>
            <span className="icon-text"> LOG ACTIVITIES </span>
          </div>
        </Link>
        <Link to="/">
          <div className="sidebar-icon">
            <span className="material-symbols-outlined">exercise</span>
            <span className="icon-text"> WORKOUTS </span>
          </div>
        </Link>
      </div>

      <div className="bottom-sidebar">
        <Link to="/">
          <div className="sidebar-icon">
            <span className="material-symbols-outlined">account_circle</span>
            <span className="icon-text"> Profile </span>
          </div>
        </Link>
        <Link to="/">
          <div className="sidebar-icon">
            <span className="material-symbols-outlined">settings</span>
            <span className="icon-text"> Settings </span>
          </div>
        </Link>
        <Link to="/">
          <div className="sidebar-icon">
            <span className="material-symbols-outlined">logout</span>
            <span className="icon-text"> Log Out </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
