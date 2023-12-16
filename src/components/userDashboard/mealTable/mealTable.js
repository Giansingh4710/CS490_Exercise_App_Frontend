import React, { useState, useEffect } from 'react';
//import MealInputModal from '../mealInput/mealInput';
import './mealTable.css';
import apiClient from '../../../services/apiClient';

const MealTracker = ({ isMealInputModalOpen, setMealInputModalOpen }) => {
  const [meals, setMeals] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
  });
  const [selectedMealType, setSelectedMealType] = useState(null);

  useEffect(() => {
      async function getMeals(){
        const { data, error } = await apiClient.getMeals();
        if(data){
          console.log('API Response:', data);

          // Check if the response has the expected structure
          if (data && typeof data === 'object') {
            setMeals(data);
          } else {
            // Handle the case where the response doesn't have the expected structure
            console.error('Unexpected response format:', data);
          }
          if(error){
            console.error('Unexpected response format:', data);
          }
        }
      }
      getMeals();
  }, []);

  const handleDeleteMeal = async (mealType, mealId) => {
    // Implement logic to delete a specific meal from the backend
    let token = localStorage.getItem('fitness_token');
    
    const { data, error } = await apiClient.deleteMeal(mealId);

    if(data){
      const updatedMeals = { ...meals };
      updatedMeals[mealType] = updatedMeals[mealType].filter((meal) => meal.id !== mealId);
      setMeals(updatedMeals);
    }

    if(error){
      console.error('Error deleting meal:', error);
    }
  };  

  const handleAddMealClick = (mealType) => {
    if (selectedMealType === mealType) {
      // Toggle visibility if the same meal type is clicked again
      setMealInputModalOpen(!isMealInputModalOpen);
    } else {
      // Set the new meal type and show the modal
      setSelectedMealType(mealType);
      setMealInputModalOpen(true);
    }
  };

  const renderMealTypes = () => {
    const mealTypes = ['breakfast', 'lunch', 'dinner', 'snacks'];

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
              <div>&nbsp;</div>
              <button className='add-meal-button' onClick={() => handleAddMealClick(mealType)}>
                + a meal
              </button>
            </li>
          )}
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