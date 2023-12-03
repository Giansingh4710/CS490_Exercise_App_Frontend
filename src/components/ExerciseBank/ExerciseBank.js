import React, { useState } from 'react';

const ExerciseBank = ({ exercises }) => {
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState(null);

  const filteredExercises = selectedMuscleGroup
    ? exercises.filter(exercise => exercise.muscleGroup === selectedMuscleGroup)
    : exercises;

  const muscleGroups = [...new Set(exercises.map(exercise => exercise.muscleGroup))];

  return (
    <div>
      <h2>Exercise Bank</h2>
      <div>
        <label>Filter by Muscle Group: </label>
        <select onChange={(e) => setSelectedMuscleGroup(e.target.value)}>
          <option value="">All</option>
          {muscleGroups.map(group => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
      </div>
      {filteredExercises.length === 0 ? (
        <p>No exercises available for the selected muscle group.</p>
      ) : (
        <ul>
          {filteredExercises.map(exercise => (
            <li key={exercise.id}>
              <h3>{exercise.name}</h3>
              <p>{exercise.description}</p>
              <p>Muscle Group: {exercise.muscleGroup}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExerciseBank;