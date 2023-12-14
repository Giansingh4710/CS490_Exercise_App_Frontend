import React, { useState, useEffect } from 'react';
import './ExerciseBank.css';

const ExerciseBank = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState('');

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch('http://localhost:1313/exercises/allExercises');
        if (!response.ok) {
          throw new Error('Failed to fetch exercises');
        }
        const data = await response.json();
        setExercises(data);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    fetchExercises();
  }, []);

  const filteredExercises = exercises
    ? exercises.filter((exercise) => {
        const isMuscleGroupMatch = !selectedMuscleGroup || exercise.muscleGroup.toLowerCase() === selectedMuscleGroup.toLowerCase() || selectedMuscleGroup === 'All';
        const isEquipmentMatch = !selectedEquipment || exercise.equipment.toLowerCase() === selectedEquipment.toLowerCase() || selectedEquipment === 'All';
        const isSearchTermMatch = !searchTerm || exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
        return isMuscleGroupMatch && isEquipmentMatch && isSearchTermMatch;
      })
    : [];

  const muscleGroups = exercises ? ['All', 'Chest', 'Back', 'Bicep', 'Tricep', 'Shoulder', 'Abdominal', 'Leg'] : [];
  const equipmentOptions = exercises ? ['All', 'Barbell', 'Machine', 'Bodyweight', 'Dumbells', 'Bench Press', 'Other'] : [];

  const handleSubmission = () => {
    console.log('Submitted!');
  };

  const handleCancel = () => {
    console.log('Cancelled!');
  };

  return (
    <div className="exercise-bank-container">
      <h2>Exercise Bank</h2>
      <div className="filter-section">
        <div className="filter-item" id="filter-search">
          <label>Search by Exercise Name: </label>
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
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
              <li key={exercise.id !== undefined ? String(exercise.id) : Math.random().toString()}>
                <h3>{exercise.name}</h3>
                <p>{exercise.difficulty}</p>
                <p>{exercise.type}</p>
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
