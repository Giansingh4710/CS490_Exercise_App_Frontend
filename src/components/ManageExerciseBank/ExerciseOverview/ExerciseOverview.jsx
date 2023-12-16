import React, { useState } from 'react';
import './ExerciseOverview.css';
import ExerciseCard from './ExerciseCard'; // Import ExerciseCard component
import ExerciseModal from './ExerciseModal';

export default function ExerciseOverview({ exercises, onSelectExercise, onExerciseCreated }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submit action
    // Logic to handle search
  };

  const handleCreateExerciseButtonClick = () => {
    setIsModalOpen(true); // Open the modal when the button is clicked
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleExerciseCreation = (newExercise) => {
    onExerciseCreated(newExercise); // This function should update the list of exercises in the parent component
    handleModalClose(); // Close the modal after saving the new exercise
  };

  const filteredExercises = exercises.filter((exercise) => 
  exercise.name ? exercise.name.toLowerCase().includes(searchTerm) : false
);

  return (
    <div className='exercise-overview'>
      <div className='exercise-overview-header'>
        <button onClick={handleCreateExerciseButtonClick} className='add-exercise-button'>
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

      <ExerciseModal
        isOpen={isModalOpen}
        closeModal={handleModalClose}
        onSave={handleExerciseCreation}
      />
    </div>
  );
}
