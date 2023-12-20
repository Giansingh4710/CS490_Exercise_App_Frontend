import React, { useEffect, useState } from 'react'
import './ExerciseDetail.css'
import apiClient from '../../../services/apiClient'

export default function ExerciseDetail({ selectedExercise }) {
  const [exerciseIsActive, setExerciseIsActive] = useState(true)

  const setExerciseStatus = async () => {
    console.log('selected exercise:', selectedExercise)
    if (selectedExercise?.status === 'Disabled') setExerciseIsActive(false)
    else if (selectedExercise?.status === 'Enabled') setExerciseIsActive(true)
  }

  const handleCheckboxChange = async () => {
    if (selectedExercise && selectedExercise.exerciseID) {
      try {
        if (exerciseIsActive) {
          const { data } = await apiClient.disableExercise(selectedExercise.exerciseID)
          if (data) {
            console.log('Successfully disabled exercise')
          }
        } else {
          const { data } = await apiClient.enableExercise(selectedExercise.exerciseID)
          if (data) {
            console.log('Successfully enabled exercise')
          }
        }
        setExerciseIsActive(!exerciseIsActive)
      } catch (error) {
        console.error(`Error ${exerciseIsActive ? 'disabling' : 'enabling'} exercise:`, error)
      }
    }
  }

  useEffect(() => {
    setExerciseStatus()
  }, [selectedExercise])

  if (!selectedExercise) {
    return (
      <div className='exercise-detail-view'>
        <h2>Select an Exercise to View Details</h2>
      </div>
    )
  }

  return (
    <div className='exercise-detail-view'>
      <div className='exercise-header'>
        <h2>Exercise: {selectedExercise.name}</h2>

        <label className='enable-disable-exercise'>
          <input
            type='checkbox'
            checked={exerciseIsActive}
            onChange={handleCheckboxChange}
            name='enabled-or-disabled'
          />
          {exerciseIsActive ? 'Active' : 'Disabled'}
        </label>
      </div>
      <div className='exercise-details'>
        <div>
          <strong>Type:</strong>
          <br />
          {selectedExercise.type}
        </div>
        <div>
          <strong>Difficulty:</strong>
          <br />
          {selectedExercise.difficulty}
        </div>
        <div>
          <strong>Muscle Group:</strong>
          <br />
          {selectedExercise.muscleGroup}
        </div>
      </div>
    </div>
  )
}
