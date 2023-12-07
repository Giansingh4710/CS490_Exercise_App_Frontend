import React, { useState, useEffect } from 'react';
import './ExerciseBank.css';  // Import the CSS file

const ExerciseBank = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState(''); // Provide default value
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState(''); // Provide default value

  useEffect(() => {
    // Replace this placeholder URL with your actual backend API endpoint
    fetch('https://your-backend-api.com/exercises')
      .then((response) => response.json())
      .then((data) => setExercises(data))
      .catch((error) => console.error('Error fetching exercises:', error));
  }, []);

  const filteredExercises = exercises
    ? exercises
        .filter((exercise) => (!selectedMuscleGroup || exercise.muscleGroup === selectedMuscleGroup))
        .filter((exercise) => (!searchTerm || exercise.name.toLowerCase().includes(searchTerm.toLowerCase())))
        .filter((exercise) => (!selectedEquipment || exercise.equipment === selectedEquipment))
    : [];

  const muscleGroups = exercises ? ['All', 'Chest', 'Back', 'Arms', 'Shoulders', 'Abs', 'Legs'] : [];
  const equipmentOptions = exercises ? ['All', 'Barbell', 'Machine', 'Bodyweight', 'Dumbbell', 'Other'] : [];

  const handleSubmission = () => {
    // Implement submission logic here
    console.log('Submitted!');
  };

  const handleCancel = () => {
    // Implement cancel logic here
    console.log('Cancelled!');
  };

  return (
    <div className="exercise-bank-container">
      <h2>Exercise Bank</h2>
      <div className="filter-section">
        <div className="filter-item" id="filter-muscle-group">
          <label>Filter by Muscle Group: </label>
          <select onChange={(e) => setSelectedMuscleGroup(e.target.value)} value={selectedMuscleGroup}>
            {muscleGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-item" id="filter-search">
          <label>Search by Exercise Name: </label>
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="filter-item" id="filter-equipment">
          <label>Filter by Equipment: </label>
          <select onChange={(e) => setSelectedEquipment(e.target.value)} value={selectedEquipment}>
            {equipmentOptions.map((equipment) => (
              <option key={equipment} value={equipment}>
                {equipment}
              </option>
            ))}
          </select>
        </div>
        <button className="submit-button" id="exercise-bank-submit-button" onClick={handleSubmission}>
          SUBMIT
        </button>
        <button className="cancel-button" id="exercise-bank-cancel-button" onClick={handleCancel}>
          CANCEL
        </button>
      </div>
      <div className="exercise-list-container">
        {filteredExercises.length === 0 ? (
          <p>No exercises available for the selected criteria.</p>
        ) : (
          <ul>
            {filteredExercises.map((exercise) => (
              <li key={exercise.id}>
                <h3>{exercise.name}</h3>
                <p>{exercise.description}</p>
                <p>Muscle Group: {exercise.muscleGroup}</p>
                <p>Equipment: {exercise.equipment}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExerciseBank;
