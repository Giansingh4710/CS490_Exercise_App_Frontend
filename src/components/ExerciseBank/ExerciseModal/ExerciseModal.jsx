import React from 'react';
import './ExerciseModal.css';

const ExerciseBankModal = ({ onClose, children }) => {
  return (
    <div className="exercise-bank-modal">
      {children}
      <button onClick={onClose} className="cancel-button">
        CLOSE
      </button>
    </div>
  );
};

export default ExerciseBankModal;
