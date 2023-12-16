import React, { useState, useEffect } from 'react';
import ExerciseBankModal from './ExerciseModal/ExerciseModal';
import './ExerciseBank.css';
import apiClient from '../../services/apiClient';

const ExerciseBank = ({ viewOnly }) => {
  const [exercises, setExercises] = useState([]);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchExercises = async () => {
        const { data, error } = await apiClient.getAllExercises();
        if(data){
          setExercises(data);
        }
        if(error){
          console.error("Error fetching exercises", error);
        }
    }
  
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

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Open Exercise Bank</button>
      {isModalOpen && (
        <ExerciseBankModal onClose={closeModal}>
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
          </div>
          <div className="exercise-list-container">
            {filteredExercises.length === 0 ? (
              <p>No exercises available for the selected criteria.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Difficulty</th>
                    <th>Type</th>
                    <th>Muscle Group</th>
                    <th>Equipment</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExercises.map((exercise) => (
                    <tr key={exercise.id !== undefined ? String(exercise.id) : Math.random().toString()}>
                      <td>{exercise.name}</td>
                      <td>{exercise.difficulty}</td>
                      <td>{exercise.type}</td>
                      <td>{exercise.muscleGroup}</td>
                      <td>{exercise.equipment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="button-container">
            {!viewOnly && (
              <>
                <button className="submit-button" id="exercise-bank-submit-button" onClick={handleSubmission}>
                  SUBMIT
                </button>
                <button className="cancel-button" id="exercise-bank-cancel-button" onClick={handleCancel}>
                  CANCEL
                </button>
              </>
            )}
          </div>
        </ExerciseBankModal>
      )}
    </div>
  );
};

export default ExerciseBank;
