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
    return (
      <div className='day-card'>
        <table className='workout-card'>
          <thead>
            <tr>
              <th>Exercise</th>
              <th>Set #</th>
              {exercise.metric === 'Reps' ? <th># of Reps</th> : <th>Duration</th>}
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
            {exercise.reps.map((rep, index) => (
              <tr key={index}>
                {index === 0 ? <td>{exercise.exercise}</td> : <td></td>}
                <td>{index + 1}</td>
                <td>{exercise.reps[index]}</td>
                <td>{exercise.weight && exercise.weight[index] !== null ? 
                     (exercise.equipment === 'Bodyweight' ? <p>Bodyweight</p> : `${exercise.weight[index]} lbs`) : ''}</td>
              </tr>
            ))}
          </tbody>
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
