import React, { useState, useEffect } from 'react';
import './mealTable.css';
import apiClient from '../../../services/apiClient';

const MealTracker = ({ isMealInputModalOpen, setMealInputModalOpen }) => {
  const [meals, setMeals] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    snack: [],
  });
  const [selectedMealType, setSelectedMealType] = useState(null);

  useEffect(() => {
    async function getMeals() {
      const { data, error } = await apiClient.getMeals();
      if (data) {
        console.log('API Response:', data);

        // Check if the response has the expected structure
        if (data && typeof data === 'object') {
          setMeals(data);
        } else {
          // Handle the case where the response doesn't have the expected structure
          console.error('Unexpected response format:', data);
        }
        if (error) {
          console.error('Unexpected response format:', data);
        }
      }
    }
    getMeals();
  }, []);

  const handleDeleteMeal = async (mealType, mealId) => {
    const { data, error } = await apiClient.deleteMeal(mealId);

    if (data) {
      const updatedMeals = { ...meals };
      updatedMeals[mealType] = updatedMeals[mealType].filter((meal) => meal.id !== mealId);
      setMeals(updatedMeals);
    }

    if (error) {
      console.error('Error deleting meal:', error);
    }
  };

  const handleAddMealClick = (mealType) => {
    setSelectedMealType(mealType);
    setMealInputModalOpen(true);
  };

  const renderMealTypes = () => {
    const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];

    return mealTypes.map((mealType) => (
      <div key={mealType} className='meal-type-container'>
        <h2 className='meal-type-label'>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h2>
        <ul className='meal-list'>
          {meals[mealType] && meals[mealType].length > 0 ? (
            meals[mealType].map((meal, index) => (
              <li key={`${mealType}-${index}`} className='meal-line'>
                <div>{meal.foodName}</div>
                <div>{meal.calories} calories</div>
                <button className='delete-a-meal' onClick={() => handleDeleteMeal(mealType, meal.id)}>
                  <span className='material-symbols-outlined'>delete</span>
                </button>
              </li>
            ))
          ) : (
            <li key={`empty-${mealType}`} className='meal-line'>
              <div>Nothing tracked yet</div>
            </li>
          )}
          {/* "Add a meal" button in line with each meal type */}
          <li className='meal-line'>
            <button className='add-meal-button' onClick={() => handleAddMealClick(mealType)}>
              + a meal
            </button>
          </li>
        </ul>
      </div>
    ));
  };

  return (
    <div className='meal-table-container'>
      <h1 className='meal-table-heading'>Today’s Meals</h1>
      {renderMealTypes()}
    </div>
  );
};

export default MealTracker;
