import React, { useEffect, useState } from 'react'
import "./MyLoggedWorkouts.css";
import apiClient from "../../../services/apiClient";

export default function MyLoggedWorkouts() {
  // const [coach, setCoach] = useState(null);
  const [workoutPlan, setWorkoutPlan] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {    
    async function getWorkoutPlan(){
      const { data, error } = await apiClient.getLoggedWorkout();
      console.log(data);
      if(data){
        setWorkoutPlan(data);
      }
      if(error){
        setWorkoutPlan({});
        setErrorMessage("Error getting assigned workouts");
      }
    }
    getWorkoutPlan();
  }, [])

  return (
    <div className="my-assigned-workouts">
      {errorMessage && <p className="success-message">{errorMessage}</p>}
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
        {console.log(workoutPlan)}
      {workoutPlan.forEach((date, index) => (
        <>
        <div class='week-day'>{date}</div>
          {workoutPlan[date] && workoutPlan[date].length > 0 ?
              workoutPlan[date].map((exercise) => (
                <DailySchedule key={index} date={date} exercise={exercise}/>
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

function DailySchedule({ date, exercise}) {
  return (
    <div class='day-card'>
      {
          <table class='workout-card'>
            <tr>
              <th>Exercise</th>
              <th>Set #</th>
              {exercise.metric === 'Reps' ? <th># of Reps</th> : <th>Duration</th>}
              <th>Weight</th>
            </tr>
            {
              exercise.reps.map((rep, index) => (
                <tr>
                {index === 0 ? <td>{exercise.exercise}</td> : <td></td>}
                <td>{index+1}</td>
                <td>{exercise.reps[index]}</td>
                <td>{exercise.equipment === 'Bodyweight' ? <p>Bodyweight</p> : exercise.weight + ' lbs'}</td>
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
