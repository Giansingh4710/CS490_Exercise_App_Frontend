import React from "react";
import "./MyCoach.css";
import MyMessagesWithCoach from "./MyMessagesWithCoach/MyMessagesWithCoach";
import MyAssignedWorkouts from "./MyAssignedWorkouts/MyAssignedWorkouts";
export default function MyCoach() {
  // to do: add logic to fetch coaches name
  var coachName = "Doe";
  return (
    <div className="my-coach">
      <MyMessagesWithCoach coachName={coachName} />
      <MyAssignedWorkouts />
      <p className="fire-coach-link"> Terminate Coach {coachName} </p>
    </div>
  );
}

export default MyCoach

export default MyCoach;