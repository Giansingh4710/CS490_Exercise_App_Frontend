import React, { useState } from 'react'
import './ExerciseOverview.css'
import ExerciseCard from './ExerciseCard' // Import ExerciseCard component

export default function ExerciseOverview({ exercises, onSelectExercise }) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase())
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault() // Prevent the default form submit action
    // Logic to handle search
  }

  const handleButtonClick = () => {
    console.log('Button was clicked!')
  }
  const handleSearchIconClick = () => {
    // Logic to handle search
  }

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchTerm),
  )

  return (
    <div className='exercise-overview'>
      <div className='exercise-overview-header'>
        <button onClick={handleButtonClick} className='add-exercise-button'>
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
        {filteredExercises.map((exercise) => (
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

function ExerciseList({ exercises, onSelectExercise }) {
  return (
    <div>
      {exercises?.map((exercise) => (
        <ExerciseCard
          key={exercise.exerciseID}
          exercise={exercise}
          onSelectExercise={onSelectExercise}
        />
      ))}
    </div>
  )
}
