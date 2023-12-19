import React, { useState } from 'react';
import './mealInput.css';
import Modal from '../../Modal/Modal';
import apiClient from '../../../services/apiClient';

const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

export default function MealInputModal({ setModalIsOpen }) {
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');
  const [mealType, setMealType] = useState('');

  const handleSubmit = async () => {
    try {
      const { data, error } = await apiClient.mealInput({
        mealName,
        calories,
        protein,
        fat,
        mealType,
      });

      if (data) {
        // Handle successful response
        console.log('Meal input successful:', data);
        window.location.reload();

        // Optionally close the modal or perform other actions on success
        setModalIsOpen(false);
      } else {
        // Handle error response
        console.error('Error:', error);

        // Optionally display an error message or take other actions on error
      }
    } catch (error) {
      // Handle unexpected errors, e.g., display an error message
      console.error('Unexpected error:', error);
    }
  };

  const inputFieldsElement = inputFields({
    mealName,
    setMealName,
    calories,
    setCalories,
    protein,
    setProtein,
    fat,
    setFat,
    mealType,
    setMealType,
  });

  return (
    <Modal
      inputFields={inputFieldsElement}
      headerName='ADD A MEAL'
      setModalIsOpen={setModalIsOpen}
      handleOnSubmitClick={handleSubmit}
    />
  );
}

export function inputFields({
  mealName,
  setMealName,
  calories,
  setCalories,
  protein,
  setProtein,
  fat,
  setFat,
  mealType,
  setMealType,
}) {
  return (
    <>
      <div className='input-field'>
        <label>
          Meal Name:
          <input type='text' value={mealName} onChange={(e) => setMealName(e.target.value)} />
        </label>
      </div>
      <div className='input-field'>
        <label>
          Calories:
          <input type='number' value={calories} onChange={(e) => setCalories(e.target.value)} />
        </label>
      </div>
      <div className='input-field'>
        <label>
          Protein (g):
          <input type='number' value={protein} onChange={(e) => setProtein(e.target.value)} />
        </label>
      </div>
      <div className='input-field'>
        <label>
          Fat (g):
          <input type='number' value={fat} onChange={(e) => setFat(e.target.value)} />
        </label>
      </div>
      <div className='input-field'>
        <label>
          Meal Type:
          <select value={mealType} onChange={(e) => setMealType(e.target.value)}>
            <option value=''>Select Meal Type</option>
            {mealTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
      </div>
    </>
  );
}
