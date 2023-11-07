import React from "react";
import "./MyAssignedWorkouts.css";

export default function MyAssignedWorkouts() {
  return (
    <div className="my-assigned-workouts">
      <div className="my-assigned-workouts-container">
        <div className="my-assigned-workouts-header-container">
          <h2 className="my-assigned-workouts-header">My Assigned Workouts</h2>
          <MyWeeklySchedule />
        </div>
      </div>
    </div>
  );
}

function MyWeeklySchedule() {
  var weekdaySchedule = ["Mon", "Tues", "Weds", "Thurs", "Fri", "Sat"];
  return (
    <div className="my-weekly-schedule">
      {weekdaySchedule.map((day, index) => (
        <DailySchedule key={index} day={day} />
      ))}
    </div>
  );
}

function DailySchedule({ day }) {
  return (
    <div>
      <div>{day}</div>
    </div>
  );
}
