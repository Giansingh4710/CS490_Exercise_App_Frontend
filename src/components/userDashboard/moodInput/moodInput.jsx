import React, { useState } from 'react';
import './moodInput.css';

const MoodInputModal = () => {
  const [mood, setMood] = useState('happy'); // Default mood

  const handleMoodChange = (e) => {
    setMood(e.target.value);
  };

  /*const handleSubmit = () => {
    let token = localStorage.getItem('fitness_token');
    fetch('http://127.0.0.1:1313/logActivity/logMood', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ mood }),
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

  const moodOptions = ['Very Unhappy', 'Unhappy', 'Content', 'Happy', 'Very Happy'];

  return (
    <div>
      <link rel="stylesheet" href="./moodInput.css" />
      <div className="mood-card-container">
        <h1>Today's Mood Entry</h1>
        <div className="input-fields">
          <div className="input-field">
            <label>
              MOOD
              <select value={mood} onChange={handleMoodChange}>
                {moodOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodInputModal;
