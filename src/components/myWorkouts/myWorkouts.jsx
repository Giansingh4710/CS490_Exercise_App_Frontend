import React, { useEffect, useState } from 'react';
import ExerciseBankModal from './ExerciseBankModal'; // Import the modal component
import apiClient from '../../services/apiClient'; // Update this path according to your project structure

function MyAssignedWorkouts() {
  const [workoutPlan, setWorkoutPlan] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);

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

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="my-assigned-workouts">
      <MyWeeklySchedule workoutPlan={workoutPlan} onAddWorkout={openModal} />
      {isModalOpen && <ExerciseBankModal onClose={closeModal} />}
    </div>
  );
}

function MyWeeklySchedule({ workoutPlan, onAddWorkout }) {
  var weekdaySchedule = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  return (
    <div className="my-weekly-schedule">
      {weekdaySchedule.map((day, index) => (
        <React.Fragment key={index}>
          <div className='week-day'>{day.toUpperCase()}</div>
          {workoutPlan[day] && workoutPlan[day].length > 0 ?
            workoutPlan[day].map((exercise, exerciseIndex) => (
              <DailySchedule key={exerciseIndex} day={day} exercise={exercise} />
            ))
            :
            <NoWorkoutsAssigned />
          }
          <button onClick={onAddWorkout}>+ Add a new workout</button>
          <hr />
        </React.Fragment>
      ))}
    </div>
  );
}

function DailySchedule({ day, exercise }) {
  const hasReps = Array.isArray(exercise.reps) && exercise.reps.length > 0;

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
        </tbody>
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

export default MyAssignedWorkouts;
