import React from "react";
import "./MyCoach.css";
import MyMessagesWithCoach from "./MyMessagesWithCoach/MyMessagesWithCoach";
import MyAssignedWorkouts from "./MyAssignedWorkouts/MyAssignedWorkouts";

export default function MyCoach() {
  // TODO: Add logic to fetch coach's name and details
  var coachName = "Coach Doe"; // You will replace this with actual data

  return (
    <div className="my-coach-container">
      <header className="my-coach-header">
        <h1>MY COACH</h1>
        <div className="coach-details">
          <h2>{coachName}</h2>
          {/* Placeholder for the star rating component */}
          <div className="star-rating">: ★★★★✰ </div>
        </div>
      </header>

      <div className="content">
        <MyAssignedWorkouts />
        <MyMessagesWithCoach coachName={coachName} />
      </div>

      <footer>
        <button className="terminate-coach">Terminate {coachName}</button>
      </footer>
    </div>
  );
}
