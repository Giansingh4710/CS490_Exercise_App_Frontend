import React from 'react';
import './ExerciseDetail.css';
import apiClient from '../../../services/apiClient';

export default function ExerciseDetail({ selectedExercise }) {
 

  const handleDelete = async () => {
    try {
      if (selectedExercise && selectedExercise.exerciseID) {
        const response = await apiClient.deleteExercise(selectedExercise.exerciseID);
        console.log(response); // Handle response
        window.location.reload(); // Reloads the current page
        
      }
    } catch (error) {
      console.error('Error deleting exercise:', error);
    }
  };
  
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
      <button className="active-button" onClick={handleDelete}>
        Delete Exercise
      </button>      </div>
      <div className='exercise-details'>
        <div><strong>Type:</strong><br/>{selectedExercise.type}</div>
        <div><strong>Difficulty:</strong><br/>{selectedExercise.difficulty}</div>
        <div><strong>Muscle Group:</strong><br/>{selectedExercise.muscleGroup}</div>
      </div>
    </div>
  );
}
