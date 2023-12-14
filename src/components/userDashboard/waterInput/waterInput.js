import React, { useState, useEffect } from 'react';
import './waterInput.css';

const WaterInputModal = ({ setRecordedData }) => {
  const [amount, setAmount] = useState(''); // Default value is an empty string
  const [unit, setUnit] = useState('fl oz'); // Default unit

  const handleAmountChange = (e) => {
    setAmount(e.target.value);

    // Call the prop to update the parent component's recordedData
    setRecordedData((prevData) => ({
      ...prevData,
      waterAmount: e.target.value,
    }));
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);

    // Call the prop to update the parent component's recordedData
    setRecordedData((prevData) => ({
      ...prevData,
      waterUnit: e.target.value,
    }));
  };

  // Log the unit whenever it changes
  useEffect(() => {
    console.log('Current Unit:', unit);
  }, [unit]);

  return (
    <div>
      <link rel='stylesheet' href='./waterInput.css' />
      <div className='water-card-container'>
        <h1>Today's Water Intake</h1>
        <div className='input-fields'>
          <div className='input-field'>
            <label id='label1'>
              AMOUNT OF WATER
              <input type='number' step='0.01' value={amount} onChange={handleAmountChange} />
            </label>
          </div>
          <div className='input-field'>
            <label id='label2'>
              MEASUREMENT
              <select value={unit || 'fl oz'} onChange={handleUnitChange}>
                <option value='fl oz'>fl oz</option>
                <option value='cups'>cups</option>
                <option value='gallons'>gallons</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterInputModal;
