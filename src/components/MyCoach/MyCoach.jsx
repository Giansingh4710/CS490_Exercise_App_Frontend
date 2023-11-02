import React from "react";
import "./MyCoach.css";
import MyMessagesWithCoach from "./MyMessagesWithCoach/MyMessagesWithCoach";

export default function MyCoach() {
  // to do: add logic to fetch coaches name
  var coachName = "Doe";
  return (
    <div className="my-coach">
      <MyMessagesWithCoach coachName={coachName} />
    </div>
  );
}
