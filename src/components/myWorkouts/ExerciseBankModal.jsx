import React from 'react';
import Modal from './../Modal/Modal'; // Ensure this path is correct
import ExerciseBank from './ExerciseBank'; // Import the ExerciseBank component

export default function ExerciseBankModal({ setModalIsOpen }) {
  return (
    <Modal headerName="Exercise Bank" setModalIsOpen={setModalIsOpen}>
      {/* Include the ExerciseBank component inside the modal */}
      <ExerciseBank />
    </Modal>
  );
}
