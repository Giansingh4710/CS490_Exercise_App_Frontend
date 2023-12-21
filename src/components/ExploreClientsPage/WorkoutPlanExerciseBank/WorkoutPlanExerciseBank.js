import React, { useState, useEffect } from 'react'
import WorkoutPlanExerciseBankModal from './WorkoutPlanExerciseModal/WorkoutPlanExerciseModal'
import './WorkoutPlanExerciseBank.css'
import apiClient from '../../../services/apiClient'

const WorkoutPlanExerciseBank = ({ viewOnly, onExerciseSelect }) => {
  const [exercises, setExercises] = useState([])
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEquipment, setSelectedEquipment] = useState('')
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedExerciseID, setSelectedExerciseID] = useState(null)

  useEffect(() => {
    const fetchExercises = async () => {
      const { data, error } = await apiClient.getAllExercises()
      if (data) {
        setExercises(data)
      }
      if (error) {
        console.error('Error fetching exercises', error)
      }
    }

    fetchExercises()
  }, [])

  useEffect(() => {
    setSelectedExerciseID(selectedExerciseID)
  }, [selectedExerciseID])

  const filteredExercises = exercises
    ? exercises.filter((exercise) => {
        const isMuscleGroupMatch =
          !selectedMuscleGroup ||
          exercise.muscleGroup.toLowerCase() === selectedMuscleGroup.toLowerCase() ||
          selectedMuscleGroup === 'All'
        const isEquipmentMatch =
          !selectedEquipment ||
          exercise.equipment.toLowerCase() === selectedEquipment.toLowerCase() ||
          selectedEquipment === 'All'
        const isSearchTermMatch =
          !searchTerm || exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
        return isMuscleGroupMatch && isEquipmentMatch && isSearchTermMatch
      })
    : []

  const muscleGroups = exercises
    ? ['All', 'Chest', 'Back', 'Bicep', 'Tricep', 'Shoulder', 'Abdominal', 'Leg']
    : []
  const equipmentOptions = exercises
    ? ['All', 'Barbell', 'Machine', 'Bodyweight', 'Dumbells', 'Bench Press', 'Other']
    : []

  const handleSubmission = () => {
    onExerciseSelect(selectedExerciseID)
    setModalOpen(false)
  }

  const handleCancel = () => {
    onExerciseSelect(null)
  }

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedExerciseID(null)
    onExerciseSelect(null)
  }

  const updateSelectedExerciseID = async (exerciseID) => {
    setSelectedExerciseID(exerciseID)
  }

  return (
    <div>
      <button onClick={openModal}>Open Exercise Bank</button>
      {isModalOpen && (
        <WorkoutPlanExerciseBankModal onClose={closeModal}>
          <h2>Exercise Bank</h2>
          <div className='filter-section'>
            <div className='filter-item' id='filter-search'>
              <label>Search by Exercise Name: </label>
              <input
                type='text'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className='filter-item' id='filter-muscle-group'>
              <label>Filter by Muscle Group: </label>
              <select
                onChange={(e) => setSelectedMuscleGroup(e.target.value)}
                value={selectedMuscleGroup}>
                {muscleGroups?.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>
            <div className='filter-item' id='filter-equipment'>
              <label>Filter by Equipment: </label>
              <select
                onChange={(e) => setSelectedEquipment(e.target.value)}
                value={selectedEquipment}>
                {equipmentOptions?.map((equipment) => (
                  <option key={equipment} value={equipment}>
                    {equipment}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='exercise-list-container'>
            {filteredExercises.length === 0 ? (
              <p>No exercises available for the selected criteria.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Difficulty</th>
                    <th>Type</th>
                    <th>Muscle Group</th>
                    <th>Equipment</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExercises?.map((exercise) => (
                    <tr
                      key={exercise?.exerciseID}
                      onClick={() => updateSelectedExerciseID(exercise?.exerciseID)}
                      className={
                        selectedExerciseID === exercise?.exerciseID ? 'exercise-selected' : ''
                      }>
                      <td>{exercise?.name}</td>
                      <td>{exercise?.difficulty}</td>
                      <td>{exercise?.type}</td>
                      <td>{exercise?.muscleGroup}</td>
                      <td>{exercise?.equipment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className='button-container'>
            {!viewOnly && (
              <>
                <button
                  className='submit-button'
                  id='exercise-bank-submit-button'
                  onClick={handleSubmission}>
                  SUBMIT
                </button>
                <button
                  className='cancel-button'
                  id='exercise-bank-cancel-button'
                  onClick={handleCancel}>
                  CANCEL
                </button>
              </>
            )}
          </div>
        </WorkoutPlanExerciseBankModal>
      )}
    </div>
  )
}

export default WorkoutPlanExerciseBank
