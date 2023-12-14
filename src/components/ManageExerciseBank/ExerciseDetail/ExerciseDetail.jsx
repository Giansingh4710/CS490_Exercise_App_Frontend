import React from 'react';
import './ExerciseDetail.css';

export default function ExerciseDetail({ selectedExercise }) {
  if (!selectedExercise) {
    return (
      <div className='exercise-detail-view'>
        <h2>Select an Exercise to View Details</h2>
      </div>
    );
  }

  return (
    <div className='exercise-detail-view'>
      <div className='exercise-header'>
        <h2>Exercise: {selectedExercise.name}</h2>
        <button className="active-button">X Active</button> {/* Added button */}
      </div>
      <div className='exercise-details'>
        <div><strong>Type:</strong><br/>{selectedExercise.type}</div>
        <div><strong>Difficulty:</strong><br/>{selectedExercise.difficulty}</div>
        <div><strong>Muscle Group:</strong><br/>{selectedExercise.muscleGroup}</div>
      </div>
    </div>
  );
}
