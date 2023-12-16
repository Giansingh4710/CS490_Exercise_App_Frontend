import React, { useEffect, useState } from 'react';
import "./MyWorkouts.css"; 
import apiClient from "../../services/apiClient"; // Adjust the import path as necessary
import ExerciseBank from '../ExerciseBank/ExerciseBank.js';

export default function MyWorkouts() {
    const [workoutPlan, setWorkoutPlan] = useState({});

    useEffect(() => {
        async function getWorkoutPlan() {
            try {
                const response = await apiClient.getWorkoutPlan();
                if (response.data) {
                    setWorkoutPlan(response.data);
                }
            } catch (error) {
                console.error("Error fetching workout plan:", error);
            }
        }
        getWorkoutPlan();
    }, []);

    return (
        <div className="my-workouts">
            <div className="my-workouts-container">
                <div className="my-workouts-header-container">
                    <h2 className="my-workouts-header">Workout Plan</h2>
                    <WeeklySchedule workoutPlan={workoutPlan} />
                </div>
            </div>
        </div>
    );
}

function WeeklySchedule({ workoutPlan }) {
    var weekdaySchedule = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    return (
        <div className="weekly-schedule">
            {weekdaySchedule.map((day, index) => (
                <div key={index}>
                    <div className='week-day'>{day.toUpperCase()}</div>
                    {workoutPlan[day] && workoutPlan[day].length > 0 ?
                        workoutPlan[day].map((exercise, exerciseIndex) => (
                            <DailySchedule key={exerciseIndex} day={day} exercise={exercise} />
                        ))
                        :
                        <NoWorkoutsAssigned />
                    }
                            <ExerciseBank viewOnly={false}/>
                    <hr></hr>
                </div>
            ))}
        </div>
    );
}
function DailySchedule({ day, exercise }) {
    const hasReps = Array.isArray(exercise.reps) && exercise.reps.length > 0;
  
    return (
      <div className='day-card'>
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
                <td>{rep}</td>
                <td>{exercise.equipment === 'Bodyweight' ? 'Bodyweight' : `${exercise.weight} lbs`}</td>
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
  

function NoWorkoutsAssigned() {
    return (
        <div className='day-card'>
            <p className='no-workout-text'>No workouts assigned!</p>
        </div>
    );
}
