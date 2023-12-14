import React from 'react';
import './ExerciseDetail.css'; 

export default function ExerciseDetail({ selectedExercise }) {
  // Return early if no exercise is selected.
  if (!selectedExercise) {
    return (
      <div className='exercise-detail-view'> {/* Make sure this class exists in your CSS */}
        <h2>Select an Exercise to View Details</h2>
      </div>
    );
  }

  // When selectedExercise is provided, render the exercise details.
  return (
    <div className='exercise-detail-view'> {/* This class should style the container of the details */}
      <div className='exercise-header'> {/* This class should style the header */}
        {}
        <h2>Exercise: {selectedExercise.Name}</h2> 
        <div className='exercise-details'> {/* This class should style the details */}
          <p>Type: {selectedExercise.Type}</p>
          <p>Difficulty: {selectedExercise.Difficulty}</p>
          <p>Muscle Group: {selectedExercise.MuscleGroup}</p>
        </div>
      </div>
    </div>
  );
}
