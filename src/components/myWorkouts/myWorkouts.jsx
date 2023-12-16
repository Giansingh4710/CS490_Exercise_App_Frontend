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
    const [selectedExerciseID, setSelectedExerciseID] = useState(null);
    const [isAddExerciseModalOpen, setAddExerciseModalOpen] = useState(false);
    const [exerciseData, setExerciseData] = useState({});
    let localExerciseData = null;

    useEffect(() => {
        
        async function getExerciseData(){
            if(selectedExerciseID !== null){
                const {data, error} = await apiClient.getExerciseData(selectedExerciseID);
                setExerciseData(data);
                setAddExerciseModalOpen(true);
            }
        }

        getExerciseData();
    }, [selectedExerciseID]);

    const handleExerciseSelect = (exerciseID) => {
        setSelectedExerciseID(exerciseID);
    };

    const closeAddExercise = () => {
        setAddExerciseModalOpen(false);
    }

    var weekdaySchedule = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    return (
        <div className="weekly-schedule">
            <ExerciseBank viewOnly={false} onExerciseSelect={handleExerciseSelect}/>
            {isAddExerciseModalOpen && <AddExerciseModal onClose={closeAddExercise} exerciseData={exerciseData}></AddExerciseModal>}
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

function AddExerciseModal({ onClose, exerciseData }){
    const [exerciseName, setExerciseName] = useState('');
    const [sets, setSets] = useState([{ reps: 0, weight: 0 }]);
    const [duration, setDuration] = useState(0);
    const [dayOfWeek, setDayOfWeek] = useState('Monday');
  
    const handleAddSet = () => {
      setSets((prevSets) => [...prevSets, { reps: 0, weight: 0 }]);
    };
  
    const handleRemoveSet = (index) => {
      setSets((prevSets) => prevSets.filter((_, i) => i !== index));
    };
  
    const handleUpdateSet = (index, property, value) => {
      setSets((prevSets) =>
        prevSets.map((set, i) => (i === index ? { ...set, [property]: value } : set))
      );
    };
  
    const handleAddExercise = () => {
      const exerciseData = {
        name: exerciseName,
        sets,
        duration,
        dayOfWeek,
      };
  
    //   onAddExercise(exerciseData);
  
      onClose();
    };

    return (
        <div className="add-exercise-modal">
      <div className="modal-content">
        <h2>Add Exercise</h2>
        <label>
          Exercise Name:
          <input
            type="text"
            value={exerciseData.name}
            onChange={(e) => setExerciseName(e.target.value)}
          />
        </label>
        <label>
          Day of the Week:
          <select value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)}>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </label>
        <table>
          <thead>
            <tr>
              <th>Set</th>
              {exerciseData.metric === 'Reps' ? <th>Reps</th> : <th>Duration</th>}
              <th>Weight (lbs)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sets.map((set, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{
                    exerciseData.equipment === 'Bodyweight' ? <p>Bodyweight</p> :
                  <input
                    type="number"
                    value={set.reps}
                    onChange={(e) => handleUpdateSet(index, 'reps', e.target.value)}
                  />
                }
                </td>
                <td>
                    {
                        exerciseData.metric === 'Reps' ?
                    <input
                        type="number"
                        value={set.weight}
                        onChange={(e) => handleUpdateSet(index, 'weight', e.target.value)}
                    />
                    :
                    <input
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                    />
                    }
                </td>
                <td>
                  <button type="button" onClick={() => handleRemoveSet(index)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={handleAddSet}>
          Add Set
        </button>

      </div>
      <div className="modal-buttons">
        <button onClick={handleAddExercise}>Add Exercise</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}