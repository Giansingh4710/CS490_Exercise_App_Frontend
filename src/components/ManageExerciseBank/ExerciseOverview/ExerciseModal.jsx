import React, { useState } from 'react';
import Modal from 'react-modal';
import './ExerciseModal.css';
import apiClient from '../../../services/apiClient';

Modal.setAppElement('#root'); // Set the root element for the modal


Modal.setAppElement('#root'); // Set the root element for the modal

export default function ExerciseModal({ isOpen, closeModal, onSave }) {
  const [exerciseName, setExerciseName] = useState('');
  const [description, setDescription] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('');
  const [equipment, setEquipment] = useState('');

  const handleSave = async () => {
    const exerciseData = {
      name: exerciseName,
      muscleGroup,
      equipment,
      type: 'Compound',
      metric: 'Reps',
    };

    try {
      const response = await apiClient.createExercise(exerciseData);
      onSave(response.data); // Pass the response data to the parent component
      // Clear the input fields and close the modal
      setExerciseName('');
      setMuscleGroup('');
      setDescription('');
      setEquipment('');
      closeModal();
    } catch (error) {
      console.error('Error creating exercise:', error);
      // Handle error scenarios here
    }
  };
  

  return (

    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <h2>Add New Exercise</h2>
      <div>
        <label>Exercise Name:</label>
        <input type="text" value={exerciseName} onChange={(e) => setExerciseName(e.target.value)} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <label>Muscle Group:</label>
        <select value={muscleGroup} onChange={(e) => setMuscleGroup(e.target.value)} required>
        <option value="" disabled selected>Select Muscle Group</option>
          <option value="Chest">Chest</option>
          <option value="Back">Back</option>
          <option value="Bicep">Bicep</option>
          <option value="Tricep">Tricep</option>
          <option value="Shoulder">Shoulder</option>
          <option value="Abdominal">Abdominal</option>
          <option value="Legs">Bicep</option>

          {/* Add more options as needed */}
        </select>
      </div>
      <div>
        <label>Equipment:</label>
        <select value={equipment} onChange={(e) => setEquipment(e.target.value)} required>
        <option value="" disabled selected>Select Equipment</option>
          <option value="Barbell">Barbell</option>
          <option value="Machine">Machine</option>
          <option value="Bodyweight">Bodyweight</option>
          <option value="Dumbells">Dumbells</option>
          <option value="Bench Press">Bench Press</option>
          <option value="Other">Other</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <button onClick={handleSave}>Save</button>
      <button onClick={closeModal}>Cancel</button>
    </Modal>

  );
}
