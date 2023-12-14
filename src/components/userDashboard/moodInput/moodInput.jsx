import React, { useState, useEffect, useCallback } from 'react';
import './moodInput.css';

const MoodInputModal = ({ setRecordedData }) => {
  const [mood, setMood] = useState('very unhappy'); // Default mood

  // Memoize the setRecordedData function using useCallback
  const memoizedSetRecordedData = useCallback(setRecordedData, [setRecordedData]);

  useEffect(() => {
    // Call the memoized function to update the parent component's recordedData on mount
    memoizedSetRecordedData((prevData) => ({
      ...prevData,
      mood: mood,
    }));
  }, [memoizedSetRecordedData, mood]); // Include mood in the dependency array

  const handleMoodChange = (e) => {
    const selectedMood = e.target.value;
    setMood(selectedMood);

    // Call the memoized function to update the parent component's recordedData when mood changes
    memoizedSetRecordedData((prevData) => ({
      ...prevData,
      mood: selectedMood,
    }));
  };

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
