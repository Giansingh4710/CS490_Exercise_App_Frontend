import React, { useState } from 'react'
import './ExerciseOverview.css'
import ExerciseCard from './ExerciseCard' // Import ExerciseCard component

export default function ExerciseOverview({ exercises, onSelectExercise, setIsModalOpen }) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase())
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault() // Prevent the default form submit action
  }
  const filteredExercises = exercises?.filter((exercise) =>
    exercise?.name ? exercise?.name.toLowerCase().includes(searchTerm) : false,
  )

  return (
    <div className='exercise-overview'>
      <div className='exercise-overview-header'>
        <button
          onClick={() => {
            setIsModalOpen(true)
          }}
          className='add-exercise-button'>
          CREATE NEW EXERCISE
        </button>
        <div className='search-container'>
          <input
            type='text'
            placeholder='Search exercises...'
            value={searchTerm}
            onChange={handleSearchChange}
            className='search-input'
          />
          <button onClick={handleSearchSubmit} className='search-btn'>
            <i className='material-icons'>search</i>
          </button>
        </div>
      </div>

      <div className='exercise-list-container'>
        {filteredExercises?.map((exercise) => (
          <ExerciseCard
            key={exercise.exerciseID}
            exercise={exercise}
            onSelectExercise={onSelectExercise}
          />
        ))}
      </div>
    </div>
  )
}
