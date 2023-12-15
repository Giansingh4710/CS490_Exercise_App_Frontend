import React, { useState } from 'react';
import './MyWorkouts.css';
import AssignedWorkouts from './assignedWorkouts/assignedWorkouts';
import AddWorkoutModal from './AddWorkoutModal/AddWorkoutModal'; // Adjust the import path as necessary
import ExerciseBank from './ExerciseBank'; // Import the ExerciseBank component

export default function MyWorkouts() {
  const [showModal, setShowModal] = useState(false);

  // Define your list of exercises here or fetch it from an API
  const exercises = [
    { id: 1, name: 'Exercise 1' },
    { id: 2, name: 'Exercise 2' },
    // Add more exercises as needed
  ];

  const handleAddWorkoutClick = () => {
    console.log('Opening modal'); // Debugging line
    setShowModal(true);
  };

  const handleAddWorkout = (workout) => {
    console.log('Adding workout:', workout);
    // Logic to add workout to your plan
  };

  return (
    <div className="my-workouts">
      <h1>My Workouts</h1>
      <AssignedWorkouts />
      <button onClick={handleAddWorkoutClick}>+ Add a new workout</button>
      {showModal && (
        <AddWorkoutModal
          setModalIsOpen={setShowModal}
          onAdd={handleAddWorkout}
          exercises={exercises}
        >
          {/* Include the ExerciseBank component inside the modal */}
          <ExerciseBank />
        </AddWorkoutModal>
      )}
    </div>
  );
}
