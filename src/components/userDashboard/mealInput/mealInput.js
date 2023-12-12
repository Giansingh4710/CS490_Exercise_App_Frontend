import React, { useState } from 'react'
import './mealInput.css'
import Modal from '../../Modal/Modal'

export default function MealInputModal({ setModalIsOpen }) {
  const [mealName, setMealName] = useState('')
  const [calories, setCalories] = useState('')
  const [protein, setProtein] = useState('')
  const [fat, setFat] = useState('')
  const [mealType, setMealType] = useState('')

  const handleSubmit = () => {
    let token = localStorage.getItem('fitness_token')
    fetch('YOUR_BACKEND_API_URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ mealName, calories, protein, fat, mealType }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend, e.g., display a success message, and close modal
        console.log(data)
        setModalIsOpen(false)
      })
      .catch((error) => {
        // Handle errors, e.g., display an error message
        console.error(error)
      })
  }
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
  })

  return (
    <Modal
      inputFields={inputFieldsElement}
      headerName='ADD A MEAL'
      setModalIsOpen={setModalIsOpen}
      handleOnSubmitClick={handleSubmit}
    />
  )
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
          <input type='text' value={mealType} onChange={(e) => setMealType(e.target.value)} />
        </label>
      </div>
    </>
  )
}
