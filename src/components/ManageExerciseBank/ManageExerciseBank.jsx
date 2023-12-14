import React, { useState, useEffect } from 'react';
import './ManageExerciseBank.css'; 
import ExerciseOverview from './ExerciseOverview/ExerciseOverview'; 
import ExerciseDetail from './ExerciseDetail/ExerciseDetail';
import apiClient from '../../services/apiClient';

export default function ManageExerciseBank() {
  const [isLoading, setIsLoading] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);

  useEffect(() => {
    const fetchAllExercises = async () => {
      setIsLoading(true);
      try {
        const response = await apiClient.getAllExercises();
        console.log("API Response:", response);
        setExercises(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching exercises:", error);
        setIsLoading(false);
      }
      
    };

    fetchAllExercises();
  }, []);
  
  

  return (
    <div className='manage-exercise-bank'>
      {isLoading ? (
        <p>Loading Exercises...</p>
      ) : (
        <div className="manage-exercise-bank-container">
          <ExerciseOverview 
            exercises={exercises} 
            setSelectedExercise={setSelectedExercise} 
          />
          <ExerciseDetail 
            selectedExercise={selectedExercise} 
          />
        </div>
      )}
    </div>
  );
}
