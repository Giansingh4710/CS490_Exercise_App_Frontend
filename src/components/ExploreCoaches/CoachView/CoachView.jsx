import React from "react";
import "./CoachView.css";

export default function CoachView({ selectedCoach }) {
  return selectedCoach ? (
    <div className="coach-view">
      <div className="coach-header">
        <h2>{selectedCoach.name}</h2>
        <button
          className="request-btn"
          // onClick={() => handleOnEditClick()}
          title="Request"
        >
          Request
        </button>
      </div>

      <div className="coach-details">
        <div className="coach-location">
          <i className="material-icons">location_on</i>
          <div className="location-text">COACH LOCATION</div>
        </div>

        <div className="about-me">
          <h3 className="about-me-header">ABOUT ME</h3>
          <div>COACHES DETAILS/INTRODUCTION </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="coach-view">
      <div className="coach-header">
        <h2>No coach selected</h2>
      </div>
    </div>
  );
}
