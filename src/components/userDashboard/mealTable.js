import React, { useState, useEffect } from 'react';
import MealInputModal from './mealInput'; // Import your MealInputModal component

const MealTracker = () => {
  const [meals, setMeals] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
  });
  const [selectedMealType, setSelectedMealType] = useState(null);
  const [isMealInputModalOpen, setMealInputModalOpen] = useState(false);

  useEffect(() => {
    // Fetch meal data from the backend API
    fetch('https://your-backend-api.com/meals')
      .then(response => response.json())
      .then(data => setMeals(data))
      .catch(error => console.error('Error fetching meal data:', error));
  }, []);

  const handleDeleteMeal = (mealType, mealId) => {
    // Implement logic to delete a meal from the backend
    // You might send a DELETE request to your backend API
    console.log(`Deleting meal with id ${mealId} from ${mealType}`);

    // Update the local state after successful deletion
    const updatedMeals = { ...meals };
    updatedMeals[mealType] = updatedMeals[mealType].filter((meal) => meal.id !== mealId);
    setMeals(updatedMeals);
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

  const renderMealType = (mealType) => (
    <div key={mealType}>
      <h2>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h2>
      {meals[mealType].length > 0 ? (
        <ul>
          {meals[mealType].map((meal) => (
            <li key={meal.id}>
              {meal.name} - {meal.calories} calories
              <button onClick={() => handleDeleteMeal(mealType, meal.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nothing tracked yet</p>
      )}
      <button onClick={() => handleAddMealClick(mealType)}>+ Add a meal</button>
      {selectedMealType === mealType && isMealInputModalOpen && (
        <MealInputModal onClose={() => { setMealInputModalOpen(false); setSelectedMealType(null); }} />
      )}
    </div>
  );

  return (
    <div>
      <h1>Today’s Meals</h1>
      {Object.keys(meals).map((mealType) => renderMealType(mealType))}
    </div>
  );
};

export default MealTracker;
