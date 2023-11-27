import React, { useState } from 'react';
import './mealInput.css';

const MealInputModal = () => {
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');

  const handleSubmit = () => {
    // Replace 'YOUR_BACKEND_API_URL' with the actual backend API endpoint
    fetch('YOUR_BACKEND_API_URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mealName, calories, protein, fat }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend, e.g., display a success message
        console.log(data);
      })
      .catch((error) => {
        // Handle errors, e.g., display an error message
        console.error(error);
      });
  };

  return (
    <div>
      <link rel='stylesheet' href='./mealInput.css' />
      <div id='meal'>
      <h2>Add Meal Input</h2>
      <label>
        Meal Name:
        <input
          type="text"
          value={mealName}
          onChange={(e) => setMealName(e.target.value)}
        />
      </label>
      <label>
        Calories:
        <input
          type="number"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />
      </label>
      <label>
        Protein (g):
        <input
          type="number"
          value={protein}
          onChange={(e) => setProtein(e.target.value)}
        />
      </label>
      <label>
        Fat (g):
        <input
          type="number"
          value={fat}
          onChange={(e) => setFat(e.target.value)}
        />
      </label>
      <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default MealInputModal;
