import React, { useState } from 'react';

const WaterInputModal = () => {
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('fl oz'); // Default unit

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  const handleSubmit = () => {
    // Replace 'YOUR_BACKEND_API_URL' with the actual backend API endpoint
    fetch('YOUR_BACKEND_API_URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, unit }),
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
      <h2>Add Water Input</h2>
      <label>
        Amount:
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={handleAmountChange}
        />
      </label>
      <label>
        Unit:
        <select value={unit} onChange={handleUnitChange}>
          <option value="fl oz">fl oz</option>
          <option value="cups">cups</option>
          <option value="gallons">gallons</option>
        </select>
      </label>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default WaterInputModal;
