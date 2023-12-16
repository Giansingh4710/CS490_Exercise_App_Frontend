import React from 'react';
import './WorkoutPlanExerciseModal.css';

const WorkoutPlanExerciseBankModal = ({ onClose, children }) => {
  return (
    <div className="exercise-bank-modal">
      {children}
      <button onClick={onClose} className="cancel-button">
        CLOSE
      </button>
    </div>
  );
};

export default WorkoutPlanExerciseBankModal;
