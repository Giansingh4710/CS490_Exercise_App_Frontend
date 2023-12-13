import React, { useState } from 'react';
import './weightInput.css';

const WeightInputModal = ({ setRecordedData }) => {
  const [weight, setWeight] = useState('');

  const handleWeightChange = (e) => {
    setWeight(e.target.value);

    // Call the prop to update the parent component's recordedData
    setRecordedData((prevData) => ({
      ...prevData,
      weight: e.target.value,
    }));
  };

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
