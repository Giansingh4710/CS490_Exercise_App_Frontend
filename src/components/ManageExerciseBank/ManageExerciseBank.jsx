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
      } catch (error) {
        console.error("Error fetching exercises:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllExercises();
  }, []);

  const handleSelectExercise = (exercise) => {
    setSelectedExercise(exercise);
  };

  const addNewExercise = (newExercise) => {
    setExercises([...exercises, newExercise]);
  };

  const updateExerciseState = (updatedExercise) => {
    const updatedExercises = exercises.map(exercise => 
      exercise.exerciseID === updatedExercise.exerciseID ? updatedExercise : exercise
    );
    setExercises(updatedExercises);
  
    // Additionally, update the selectedExercise if it's the one being modified
    if (selectedExercise && selectedExercise.exerciseID === updatedExercise.exerciseID) {
      setSelectedExercise(updatedExercise);
    }
    console.log('Updated exercises array:', updatedExercises);
    console.log('Updated selectedExercise:', updatedExercise);
  
  };
  
  return (
    <div className='manage-exercise-bank'>
      {isLoading ? (
        <p>Loading Exercises...</p>
      ) : (
        <div className="manage-exercise-bank-container">
          <div className="exercise-overview-container">
            <ExerciseOverview 
              exercises={exercises} 
              onSelectExercise={setSelectedExercise} 
              onExerciseCreated={addNewExercise}  // Pass this function as a prop

            />
          </div>
          <div className="exercise-detail-container">
      <ExerciseDetail 
  selectedExercise={selectedExercise} 
  updateExerciseState={updateExerciseState}
/>

          </div>
        </div>
      )}
    </div>
  );
}