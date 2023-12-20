import React, { useEffect, useState } from 'react'
import "./MyLoggedWorkouts.css";
import apiClient from "../../../services/apiClient";

export default function MyLoggedWorkouts() {
  const [workoutPlan, setWorkoutPlan] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {    
    async function getWorkoutPlan(){
      const { data, error } = await apiClient.getLoggedWorkout();
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
          <h2 className="my-assigned-workouts-header">Logged Workouts For The Last 5 Days</h2>
          <MyWeeklySchedule workoutPlan={workoutPlan}/>
        </div>
      </div>
    </div>
  );
}

function MyWeeklySchedule({ workoutPlan }) {
    return (
      <div className="my-weekly-schedule">
        {Object.entries(workoutPlan).map(([date, exercises]) => (
          <div key={date} className='week-day'>
            {date}
            {exercises && exercises.length > 0 ?
              exercises.map((exercise, index) => (
                <DailySchedule key={index} date={date} exercise={exercise}/>
              )) :
              <NoWorkoutsAssigned />
            }
            <hr />
          </div>
        ))}
      </div>
    );
  }
  
  function DailySchedule({exercise}) {
    const hasReps = Array.isArray(exercise.reps) && exercise.reps.length > 0;
    return (
      <div className='day-card'>
        {console.log(exercise)}
        <table className='workout-card'>
          <tr>
            <th>Exercise</th>
            <th>Set #</th>
            {exercise.metric === 'Reps' ? <th># of Reps</th> : <th>Duration</th>}
            <th>Weight</th>
          </tr>
          {hasReps ? (
            exercise.reps.map((rep, index) => (
              <tr key={index}>
                {index === 0 ? <td>{exercise.exercise}</td> : <td></td>}
                <td>{index + 1}</td>
                {exercise.metric === 'Reps' ? <td>{rep}</td> : <td>{exercise.duration[index]}</td>}
                <td>{exercise.equipment === 'Bodyweight' ? 'Bodyweight' : `${exercise.weight[index]} lbs`}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No sets data available</td>
            </tr>
          )}
        </table>
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
