import React, { useState, useEffect } from 'react';
import './ExerciseOverview.css';
import apiClient from '../../../services/apiClient';

export default function ExerciseOverview({ exercises, setSelectedExercise }) {
  return (
    <div className='exercise-overview'>
      <h3>Exercise List</h3>
      {exercises?.map((exercise) => (
        <ExerciseCard
          key={exercise.exerciseID}
          exercise={exercise}
          setSelectedExercise={setSelectedExercise}
        />
      ))}
    </div>
  );
}
function ExerciseList({ exercises }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        exercises?.map((exercise) => (
          <ExerciseCard key={exercise.exerciseID} exercise={exercise} />
        ))
      )}
    </div>
  );
}

function ExerciseCard({ exercise, setSelectedExercise }) {
  const handleOnExerciseClick = () => {
    console.log("Exercise clicked:", exercise); 
    setSelectedExercise(exercise); 
  };

  return (
    <div className='exercise-card' onClick={handleOnExerciseClick}>
      <p>{exercise?.Name}</p> {}
    </div>
  );


  return (
    <div className='exercise-card' onClick={handleOnExerciseClick}>
      <p>{exercise?.Name}</p>
    </div>
  );
}