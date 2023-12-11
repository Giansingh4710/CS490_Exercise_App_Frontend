import React, { useState, useEffect } from 'react';
import './ExerciseOverview.css';
import apiClient from '../../../services/apiClient';

export default function ExerciseOverview({ exercises }) {
  return (
    <div className='exercise-overview'>
      <h3>Exercise List</h3> {}
      <ExerciseList exercises={exercises} />
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
          <ExerciseCard key={exercise.ExerciseID} exercise={exercise} />
        ))
      )}
    </div>
  );
}

function ExerciseCard({ exercise }) {
  const handleOnExerciseClick = async () => {
    try {
      console.log("Exercise clicked:", exercise); 
    } catch (error) {
      console.error('Failed to fetch exercise details:', error);
    }
  };

  return (
    <div className='exercise-card' onClick={handleOnExerciseClick}>
      <p>{exercise?.Name}</p> {}
    </div>
  );
}
