import React from "react";
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
      <div className="sidebar-logo"></div>
    </div>
  );
}
