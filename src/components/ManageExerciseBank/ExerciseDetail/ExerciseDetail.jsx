import React from 'react';
import './ExerciseDetail.css'; 
import apiClient from '../../../services/apiClient'; 
import { useState, useEffect } from 'react';

export default function ExerciseDetail({ selectedExercise }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedExercise) {
      setIsLoading(false);
    }
  }, [selectedExercise]);


  return selectedExercise ? (
    isLoading ? (
      <div className='exercise-detail'>
        <h2>Loading Exercise Details...</h2>
      </div>
    ) : (
      <div className='exercise-detail'>
        <div className='exercise-header'>
          <h2>Exercise: {selectedExercise.Name}</h2>
          <div className='exercise-details'>
            <p>Type: {selectedExercise.Type}</p>
            <p>Difficulty: {selectedExercise.Difficulty}</p>
            <p>Muscle Group: {selectedExercise.MuscleGroup}</p>
          </div>
          {}
          {}
        </div>
      </div>
    )
  ) : (
    <div className='exercise-detail'>
      <h2>Select an Exercise to View Details</h2>
    </div>
  );
}
