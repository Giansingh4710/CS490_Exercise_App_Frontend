import React, { useEffect, useState } from 'react'
import "./MyAssignedWorkouts.css";
import apiClient from "../../../services/apiClient";

export default function MyAssignedWorkouts() {
  // const [coach, setCoach] = useState(null);
  const [workoutPlan, setWorkoutPlan] = useState({});

  useEffect(() => {    
    // this endpoint will get the workout for a user
    // as of rn 12/14/23 @ 3pm the database does not have a way to identify a workout as a client created one or a coach created one
    // julien has been assigned a ticket a i will update the backend once the table is updated
    async function getWorkoutPlan(){
      const plan = await apiClient.getWorkoutPlan();
      setWorkoutPlan(plan.data);
    }
    getWorkoutPlan();
  }, [])

  return (
    <div className="my-assigned-workouts">
      <div className="my-assigned-workouts-container">
        <div className="my-assigned-workouts-header-container">
          <h2 className="my-assigned-workouts-header">Current Workout Assigned</h2>
          <MyWeeklySchedule workoutPlan={workoutPlan}/>
        </div>
      </div>
    </div>
  );
}

function MyWeeklySchedule({workoutPlan}) {
  var weekdaySchedule = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  return (
    <div className="my-weekly-schedule">
      {weekdaySchedule.map((day, index) => (
        <>
        <div class='week-day'>{day.toUpperCase()}</div>
          {workoutPlan[day] && workoutPlan[day].length > 0 ?
              workoutPlan[day].map((exercise) => (
                <DailySchedule key={index} day={day} exercise={exercise}/>
              ))
            :
            <NoWorkoutsAssigned></NoWorkoutsAssigned>
          }
          <p>+ Add a new workout</p>
          <hr></hr>
        </>
      ))}
    </div>
  );
}

function DailySchedule({ day, exercise}) {
  return (
    <div class='day-card'>
      {
          <table class='workout-card'>
            <tr>
              <th>Exercise</th>
              <th>Set #</th>
              <th># of Reps</th>
              <th>Weight</th>
            </tr>
            {
              exercise.reps.map((rep, index) => (
                <tr>
                {index === 0 ? <td>{exercise.exercise}</td> : <td></td>}
                <td>{index+1}</td>
                <td>{exercise.reps[index]}</td>
                <td>{exercise.weight} lbs</td>
              </tr>
              ))
            }
          </table>
      }
    </div>
  );
}

function NoWorkoutsAssigned(){
  return (
    <div class='day-card'>
      <p class='no-workout-text'>No workouts assigned!</p>
    </div>
  )
}
