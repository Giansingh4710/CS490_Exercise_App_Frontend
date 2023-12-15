import React, { useState, useEffect } from 'react';
import apiClient from '../../../services/apiClient'; // Ensure this path is correct
import Modal from '../../Modal/Modal'; // Ensure this path is correct

export default function AddWorkoutModal({ setModalIsOpen, onAdd }) {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [sets, setSets] = useState([{ reps: 0, weight: 0 }]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await apiClient.getAllExercises();
        console.log('Exercises fetched:', response.data); // Debugging line
        if (response.data) {
          setExercises(response.data);
          setSelectedExercise(response.data[0]?.id);
        }
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExercises();
  }, []);

  const handleAddSet = () => {
    setSets([...sets, { reps: 0, weight: 0 }]);
  };

  const handleExerciseChange = (event) => {
    setSelectedExercise(event.target.value);
  };

  const handleSetChange = (index, field, value) => {
    const newSets = [...sets];
    newSets[index][field] = value;
    setSets(newSets);
  };

  const handleSubmit = async () => {
    const workoutData = {
      exercise: selectedExercise,
      sets,
    };

    // Call API to add the workout
    const { data, error } = await apiClient.addWorkout(workoutData);
    if (data) {
      console.log('Workout added successfully!');
      onAdd(workoutData); // Invoke the callback with new workout data
      setModalIsOpen(false); // Close the modal
    } else {
      console.error('Error adding workout:', error);
    }
  };

  return (
    <Modal setModalIsOpen={setModalIsOpen}>
      <div className="add-workout-form">
        <h3>Select Exercise</h3> {/* Header to ensure visibility */}
        <select onChange={handleExerciseChange} value={selectedExercise}>
  {exercises.map(exercise => (
    <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
  ))}
</select>

        {/* Sets List */}
        {sets.map((set, index) => (
          <div key={index}>
            <input
              type="number"
              value={set.reps}
              onChange={(e) => handleSetChange(index, 'reps', e.target.value)}
            />
            <input
              type="number"
              value={set.weight}
              onChange={(e) => handleSetChange(index, 'weight', e.target.value)}
            />
          </div>
        ))}
        <button onClick={handleAddSet}>+ Add a Set</button>

        {/* Submit Button */}
        <button onClick={handleSubmit}>Submit Workout</button>
      </div>
    </Modal>
  );
}
