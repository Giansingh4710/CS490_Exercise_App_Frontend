/* eslint-disable react-hooks/exhaustive-deps, no-unused-vars */
import React, { useState, useEffect } from 'react'
import './ManageExerciseBank.css'
import ExerciseOverview from './ExerciseOverview/ExerciseOverview'
import ExerciseDetail from './ExerciseDetail/ExerciseDetail'
import apiClient from '../../services/apiClient'
import Modal from '../Modal/Modal'

export default function ManageExerciseBank() {
  const [isLoading, setIsLoading] = useState(false)
  const [exercises, setExercises] = useState([])
  const [selectedExercise, setSelectedExercise] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchAllExercises = async () => {
    setIsLoading(true)
    try {
      const response = await apiClient.getAllExercises()
      console.log('API Response:', response)
      setExercises(response.data)
    } catch (error) {
      console.error('Error fetching exercises:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAllExercises()
  }, [])

  const handleSelectExercise = (exercise) => {
    setSelectedExercise(exercise)
  }

  const addNewExercise = (newExercise) => {
    setExercises([...exercises, newExercise])
  }

  const updateExerciseState = (updatedExercise) => {
    const updatedExercises = exercises.map((exercise) =>
      exercise.exerciseID === updatedExercise.exerciseID ? updatedExercise : exercise,
    )
    setExercises(updatedExercises)

    // Additionally, update the selectedExercise if it's the one being modified
    if (selectedExercise && selectedExercise.exerciseID === updatedExercise.exerciseID) {
      setSelectedExercise(updatedExercise)
    }
    console.log('Updated exercises array:', updatedExercises)
    console.log('Updated selectedExercise:', updatedExercise)
  }

  return (
    <div className='manage-exercise-bank'>
      {isModalOpen ? (
        <ExerciseModal setIsModalOpen={setIsModalOpen} fetchAllExercises={fetchAllExercises} />
      ) : (
        <></>
      )}
      {isLoading ? (
        <p>Loading Exercises...</p>
      ) : (
        <div className='manage-exercise-bank-container'>
          <div className='exercise-overview-container'>
            <ExerciseOverview
              setIsModalOpen={setIsModalOpen}
              exercises={exercises}
              onSelectExercise={setSelectedExercise}
              onExerciseCreated={addNewExercise} // Pass this function as a prop
            />
          </div>
          <div className='exercise-detail-container'>
            <ExerciseDetail
              selectedExercise={selectedExercise}
              updateExerciseState={updateExerciseState}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export function ExerciseModal({ setIsModalOpen, fetchAllExercises }) {
  const [exerciseName, setExerciseName] = useState('')
  const [description, setDescription] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [muscleGroup, setMuscleGroup] = useState('')
  const [equipment, setEquipment] = useState('')

  const handleOnSubmitClick = async () => {
    const exerciseData = {
      name: exerciseName,
      muscleGroup: muscleGroup,
      difficulty: difficulty,
      equipment: equipment,
      type: 'Compound',
      metric: 'Reps',
    }
    const { data, error } = await apiClient.createExercise(exerciseData)
    if (data) {
      fetchAllExercises()
    }
    setIsModalOpen(false)
  }

  const headerName = 'ADD A NEW EXERCISE '
  return (
    <Modal
      headerName={headerName}
      setModalIsOpen={setIsModalOpen}
      inputFields={
        <>
          <div>
            <label>Exercise Name:</label>
            <input
              type='text'
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
              required
              name='exerciseName'
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              name='exerciseDescription'
            />
          </div>
          <div>
            <label>Muscle Group:</label>
            <select
              value={muscleGroup}
              onChange={(e) => setMuscleGroup(e.target.value)}
              required
              name='exerciseMuscleGroup'>
              <option value='' disabled selected>
                Select Muscle Group
              </option>
              <option value='Chest'>Chest</option>
              <option value='Back'>Back</option>
              <option value='Bicep'>Bicep</option>
              <option value='Tricep'>Tricep</option>
              <option value='Shoulder'>Shoulder</option>
              <option value='Abdominal'>Abdominal</option>
              <option value='Legs'>Bicep</option>

              {/* Add more options as needed */}
            </select>
          </div>
          <div>
            <label>Difficulty:</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              required
              name='exerciseDifficulty'>
              <option value='' disabled selected>
                Select Difficulty
              </option>
              <option value='Beginner'>Beginner</option>
              <option value='Intermediate'>Intermediate</option>
              <option value='Advanced'>Advanced</option>
            </select>
          </div>
          <div>
            <label>Equipment:</label>
            <select
              value={equipment}
              onChange={(e) => setEquipment(e.target.value)}
              required
              name='exerciseEquipment'>
              <option value='' disabled selected>
                Select Equipment
              </option>
              <option value='Barbell'>Barbell</option>
              <option value='Machine'>Machine</option>
              <option value='Bodyweight'>Bodyweight</option>
              <option value='Dumbells'>Dumbells</option>
              <option value='Bench Press'>Bench Press</option>
              <option value='Other'>Other</option>
            </select>
          </div>
        </>
      }
      handleOnSubmitClick={handleOnSubmitClick}
    />
  )
}
