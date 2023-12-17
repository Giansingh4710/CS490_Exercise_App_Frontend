import React, { useEffect, useState } from 'react'
// import './MyWorkouts.css'
import apiClient from '../../../services/apiClient'
import WorkoutPlanExerciseBank from '../../WorkoutPlanExerciseBank/WorkoutPlanExerciseBank.js'

export default function Workouts(clientUserID) {
  const [workoutPlan, setWorkoutPlan] = useState({})
  useEffect(() => {
    async function getWorkoutPlan() {
      try {
        console.log(clientUserID);
        const response = await apiClient.getCoachAssignedWorkoutPlanForCoach(clientUserID);
        console.log(response);
        if (response.data) {
          setWorkoutPlan(response.data)
        }
      } catch (error) {
        console.error('Error fetching workout plan:', error)
      }
    }
    getWorkoutPlan()
  }, [])
  return (
    <div className='my-workouts'>
      <div className='my-workouts-container'>
        <div className='my-workouts-header-container'>
          <h2 className='my-workouts-header'>Workout Plan</h2>
          <WeeklySchedule workoutPlan={workoutPlan} userID={clientUserID} />
        </div>
      </div>
    </div>
  )
}

function WeeklySchedule({ workoutPlan, userID }) {
  const [selectedExerciseID, setSelectedExerciseID] = useState(null)
  const [isAddExerciseModalOpen, setAddExerciseModalOpen] = useState(false)
  const [exerciseData, setExerciseData] = useState({})
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    async function getExerciseData() {
      if (selectedExerciseID !== null) {
        const { data, error } = await apiClient.getExerciseData(selectedExerciseID)
        if (data) {
          setExerciseData(data[0])
        }
        if (error) {
          setMessage('Error getting exercise data')
        }
        setAddExerciseModalOpen(true)
      }
    }

    getExerciseData()
  }, [selectedExerciseID])

  const handleExerciseSelect = (exerciseID) => {
    setSelectedExerciseID(exerciseID)
  }

  const closeAddExercise = () => {
    setAddExerciseModalOpen(false)
  }
  const setMessage = (message) => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 3000)
  }

  var weekdaySchedule = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ]
  return (
    <div className='weekly-schedule'>
      {successMessage && <p className='success-message'>{successMessage}</p>}
      <WorkoutPlanExerciseBank viewOnly={false} onExerciseSelect={handleExerciseSelect} />
      {isAddExerciseModalOpen && (
        <AddExerciseModal
          onClose={closeAddExercise}
          exerciseData={exerciseData}
          message={setMessage}
          userID={userID}></AddExerciseModal>
      )}
      {weekdaySchedule.map((day, index) => (
        <div key={index}>
          <div className='week-day'>{day.toUpperCase()}</div>
          {workoutPlan[day] && workoutPlan[day].length > 0 ? (
            workoutPlan[day].map((exercise, exerciseIndex) => (
              <DailySchedule key={exerciseIndex} day={day} exercise={exercise} />
            ))
          ) : (
            <NoWorkoutsAssigned />
          )}
          <hr></hr>
        </div>
      ))}
    </div>
  )
}
function DailySchedule({ day, exercise }) {
  const hasReps = Array.isArray(exercise.reps) && exercise.reps.length > 0

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
            <>
              <tr key={index}>
                {index === 0 ? <td>{exercise.exercise}</td> : <td></td>}
                <td>{index + 1}</td>
                {exercise.metric === 'Reps' ? <td>{rep}</td> : <td>{exercise.duration[index]}</td>}
                <td>
                  {exercise.equipment === 'Bodyweight'
                    ? 'Bodyweight'
                    : `${exercise.weight[index]} lbs`}
                </td>
              </tr>
            </>
          ))
        ) : (
          <tr>
            <td colSpan='4'>No sets data available</td>
          </tr>
        )}
      </table>
    </div>
  )
}

function NoWorkoutsAssigned() {
  return (
    <div className='day-card'>
      <p className='no-workout-text'>No workouts planned!</p>
    </div>
  )
}

function AddExerciseModal({ onClose, exerciseData, message, userID}) {
  // eslint-disable-next-line
  const [exerciseName, setExerciseName] = useState('')
  const [sets, setSets] = useState([{ reps: 0, weight: 0 }])
  const [duration, setDuration] = useState([{ reps: 0, duration: 0 }])
  const [dayOfWeek, setDayOfWeek] = useState('Monday')

  const handleAddSet = () => {
    if (exerciseData.metric === 'Reps') {
      setSets((prevSets) => [...prevSets, { reps: 0, weight: 0 }])
    } else {
      setSets((prevSets) => [...prevSets, { reps: 0, duration: 0 }])
    }
  }

  const handleRemoveSet = (index) => {
    setSets((prevSets) => prevSets.filter((_, i) => i !== index))
  }

  const handleUpdateSet = (index, property, value) => {
    setSets((prevSets) =>
      prevSets.map((set, i) => (i === index ? { ...set, [property]: value } : set)),
    )
  }

  const handleAddExercise = async () => {
    console.log(userID);
    const newExerciseData = {
      name: exerciseData.name,
      sets,
      duration,
      dayOfWeek,
      exerciseID: exerciseData.exerciseID,
      metric: exerciseData.metric,
      userID: userID.clientID
    }

    const { data, error } = await apiClient.coachAddExerciseToPlan(newExerciseData)
    if (data) {
      message('Exercise added')
    }
    if (error) {
      message('Error adding exercise')
    }

    //   onAddExercise();

    onClose()
  }

  return (
    <div className='add-exercise-modal'>
      <div className='modal-content'>
        <h2>Add Exercise</h2>
        <label>
          Exercise Name:
          <input
            type='text'
            value={exerciseData.name}
            onChange={(e) => setExerciseName(e.target.value)}
            disabled
          />
        </label>
        <label>
          Day of the Week:
          <select value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)}>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
              (day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ),
            )}
          </select>
        </label>
        <table>
          <thead>
            <tr>
              <th>Set</th>
              {exerciseData.metric === 'Reps' ? <th>Reps</th> : <th>Duration</th>}
              {exerciseData.metric === 'Reps' ? <th>Weights (lbs)</th> : <></>}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sets.map((set, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {exerciseData.metric === 'Reps' ? (
                    <input
                      type='number'
                      value={set.reps}
                      onChange={(e) => handleUpdateSet(index, 'reps', e.target.value)}
                    />
                  ) : (
                    <input
                      type='number'
                      value={set.duration}
                      onChange={(e) => handleUpdateSet(index, 'duration', e.target.value)}
                    />
                  )}
                </td>
                {exerciseData.metric === 'Reps' ? (
                  <td>
                    {exerciseData.equipment === 'Bodyweight' ? (
                      <p>Bodyweight</p>
                    ) : (
                      <input
                        type='number'
                        value={set.weight}
                        onChange={(e) => handleUpdateSet(index, 'weight', e.target.value)}
                      />
                    )}
                  </td>
                ) : (
                  <></>
                )}
                <td>
                  <button type='button' onClick={() => handleRemoveSet(index)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type='button' onClick={handleAddSet}>
          Add Set
        </button>
      </div>
      <div className='modal-buttons'>
        <button onClick={handleAddExercise}>Add Exercise</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  )
}
