import React, { useEffect, useState } from 'react';
import "./AssignedWorkouts.css"; // Update CSS file name as well
import apiClient from "../../../services/apiClient";

export default function AssignedWorkouts() {
  const [workoutPlan, setWorkoutPlan] = useState({});

  useEffect(() => {
    async function getWorkoutPlan(){
      const plan = await apiClient.getWorkoutPlan();
      setWorkoutPlan(plan.data);
    }
    getWorkoutPlan();
  }, [])

  return (
    <div className="assigned-workouts">
      <div className="assigned-workouts-container">
        <div className="assigned-workouts-header-container">
          <h2 className="assigned-workouts-header">Current Workout Assigned</h2>
          <WeeklySchedule workoutPlan={workoutPlan}/>
        </div>
      </div>
    </div>
  );
}

function WeeklySchedule({workoutPlan}) {
  var weekdaySchedule = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  return (
    <div className="weekly-schedule">
      {weekdaySchedule.map((day, index) => (
        <>
          <div className='week-day'>{day.toUpperCase()}</div>
          {workoutPlan[day] && workoutPlan[day].length > 0 ?
            workoutPlan[day].map((exercise) => (
              <DailySchedule key={index} day={day} exercise={exercise}/>
            ))
          :
            <NoWorkoutsAssigned />
          }
          <p>+ Add a new workout</p>
          <hr></hr>
        </>
      ))}
    </div>
  );
}

function DailySchedule({ day, exercise }) {
  return (
    <div className='day-card'>
      <table className='workout-card'>
        <tr>
          <th>Exercise</th>
          <th>Set #</th>
          <th># of Reps</th>
          <th>Weight</th>
        </tr>
        {exercise.reps.map((rep, index) => (
          <tr>
            {index === 0 ? <td>{exercise.exercise}</td> : <td></td>}
            <td>{index + 1}</td>
            <td>{exercise.reps[index]}</td>
            <td>{exercise.weight} lbs</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

function NoWorkoutsAssigned() {
  return (
    <div className='day-card'>
      <p className='no-workout-text'>No workouts assigned!</p>
    </div>
  );
}
