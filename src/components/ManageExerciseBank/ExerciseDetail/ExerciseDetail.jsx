import React from 'react';
import './ExerciseDetail.css';
import apiClient from '../../../services/apiClient';

export default function ExerciseDetail({ selectedExercise }) {
 
  const handleDisableExercise = async () => {
    if (selectedExercise && selectedExercise.exerciseID) {
      try {
        const response = await apiClient.disableExercise(selectedExercise.exerciseID);
        // Handle response and update UI
      } catch (error) {
        console.error('Error disabling exercise:', error);
      }
    }
  };
  const handleEnableExercise = async () => {
    if (selectedExercise && selectedExercise.exerciseID) {
      try {
        const response = await apiClient.enableExercise(selectedExercise.exerciseID);
        // Handle response and update UI
      } catch (error) {
        console.error('Error enabling exercise:', error);
      }
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
      <button className="disable-button"onClick={handleDisableExercise}>
      Disable Exercise
      </button>   
      <button className="disable-button" onClick={handleEnableExercise}>
        Enable Exercise
      </button>  
      
         </div>
      <div className='exercise-details'>
        <div><strong>Type:</strong><br/>{selectedExercise.type}</div>
        <div><strong>Difficulty:</strong><br/>{selectedExercise.difficulty}</div>
        <div><strong>Muscle Group:</strong><br/>{selectedExercise.muscleGroup}</div>
      </div>
    </div>
  );
}
