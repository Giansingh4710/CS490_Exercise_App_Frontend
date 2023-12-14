// ExerciseCard.jsx
import React from 'react';
import './ExercisesCard.css';

export default function ExerciseCard({ exercise, setSelectedExercise }) {
  const handleOnExerciseClick = () => {
    console.log("Exercise clicked:", exercise); // This will log the clicked exercise object
    setSelectedExercise(exercise);
  };

  return (
    <div className='exercise-card' onClick={handleOnExerciseClick}>
      <p>{exercise.name}</p> {/* Ensure you use 'exercise.Name' if that's how your data properties are formatted */}
    </div>
  );
}
