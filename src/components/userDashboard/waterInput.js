import React, { useState } from 'react';
import './waterInput.css';

const WaterInputModal = () => {
  const [amount, setAmount] = useState('')
  const [unit, setUnit] = useState('fl oz') // Default unit

  const handleAmountChange = (e) => {
    setAmount(e.target.value)
  }

  const handleUnitChange = (e) => {
    setUnit(e.target.value)
  }

  const handleSubmit = () => {
    let token = localStorage.getItem('fitness_token')
    fetch('http://127.0.0.1:1313/logActivity/logWaterIntake', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({ amount, unit }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend, e.g., display a success message
        console.log(data)
      })
      .catch((error) => {
        // Handle errors, e.g., display an error message
        console.error(error)
      })
  }

  return (
    <div>
      <link rel='stylesheet' href='./waterInput.css'/>
      <div id='water'>
      <h2>Today's Water Intake</h2>
      <label id='label1'>
        AMOUNT OF WATER
        <input
          type='number'
          step='0.01'
          value={amount}
          onChange={handleAmountChange}
        />
      </label>
      <label id='label2'>
        MEASUREMENT
        <select value={unit} onChange={handleUnitChange}>
          <option value="fl oz">fl oz</option>
          <option value="cups">cups</option>
          <option value="gallons">gallons</option>
        </select>
      </label>
      <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default WaterInputModal;