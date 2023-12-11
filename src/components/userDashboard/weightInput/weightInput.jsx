import React, { useState } from 'react';
import './weightInput.css';

const WeightInputModal = () => {
  const [weight, setWeight] = useState('');

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  /*const handleSubmit = () => {
    let token = localStorage.getItem('fitness_token');
    fetch('http://127.0.0.1:1313/logActivity/logWeight', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ weight }),
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
  };*/

  return (
    <div>
      <link rel="stylesheet" href="./weightInput.css" />
      <div className="weight-card-container">
        <h1>Today's Weight Entry</h1>
        <div className="input-fields">
          <div className="input-field">
            <label>
              WEIGHT
              <input type="number" step="0.1" value={weight} onChange={handleWeightChange} />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeightInputModal;
