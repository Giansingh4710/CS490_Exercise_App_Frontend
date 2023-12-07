import React, { useState, useEffect } from 'react'
import MealInputModal from '../mealInput/mealInput' // Import your MealInputModal component
import './mealTable.css'

const MealTracker = ({ isMealInputModalOpen, setMealInputModalOpen }) => {
  const [meals, setMeals] = useState({
    breakfast: [{ name: 'Blueberry Muffin', calories: 100 }],
    lunch: [{ name: 'Cheesesteak', calories: 400 }],
    dinner: [{ name: 'Chicken Alfredo', calories: 400 }],
    snacks: [],
  })
  const [selectedMealType, setSelectedMealType] = useState(null)

  useEffect(() => {
    let token = localStorage.getItem('fitness_token')
    fetch('https://your-backend-api.com/meals', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setMeals(data))
      .catch((error) => console.error('Error fetching meal data:', error))
  }, [])

  const handleDeleteMeal = (mealType, mealId) => {
    // Implement logic to delete a meal from the backend
    // You might send a DELETE request to your backend API
    console.log(`Deleting meal with id ${mealId} from ${mealType}`)

    // Update the local state after successful deletion
    const updatedMeals = { ...meals }
    updatedMeals[mealType] = updatedMeals[mealType].filter((meal) => meal.id !== mealId)
    setMeals(updatedMeals)
  }

  const handleAddMealClick = (mealType) => {
    if (selectedMealType === mealType) {
      // Toggle visibility if the same meal type is clicked again
      setMealInputModalOpen(!isMealInputModalOpen)
    } else {
      // Set the new meal type and show the modal
      setSelectedMealType(mealType)
      setMealInputModalOpen(true)
    }
  }

  const renderMealType = (mealType) => (
    <div key={mealType} className='meal-type-container'>
      <h2 className='meal-type-label'>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h2>
      {meals[mealType].length > 0 ? (
        <ul className='meal-list'>
          {meals[mealType].map((meal) => (
            <li key={meal.id} className='meal-line'>
              <div>{meal.name}</div>
              <div> {meal.calories} calories </div>
              <button className='delete-a-meal' onClick={() => handleDeleteMeal(mealType, meal.id)}>
                <span class='material-symbols-outlined'>delete</span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className='meal-line'>Nothing tracked yet</p>
      )}
      <button className='add-meal-button' onClick={() => handleAddMealClick(mealType)}>
        + a meal
      </button>
    </div>
  )

  return (
    <div className='meal-table-container'>
      <h1 className='meal-table-heading'>Today’s Meals</h1>
      {Object.keys(meals).map((mealType) => renderMealType(mealType))}
    </div>
  )
}

export default MealTracker
