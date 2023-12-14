import WaterInputModal from './waterInput/waterInput.js';
import WeightInputModal from './weightInput/weightInput.jsx';
import MealTracker from '../userDashboard/mealTable/mealTable.js';
import MoodInputModal from './moodInput/moodInput.jsx';
import MealInput from './mealInput/mealInput.js';
import apiClient from '../../services/apiClient.js';
import { useState } from 'react';
import { BlueSubmitButton } from '../Buttons/Buttons.jsx';
import WeightGraph from './weightGraph/weightGraph.jsx';
import './UserDashboard.css';

function UserDashboard() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [recordedData, setRecordedData] = useState({});
  const [error, setError] = useState(null);

  const handleSubmission = async () => {
    try {
      // Log the recordedData before making the API call
      console.log('Recorded Data:', recordedData);

      const { data, error } = await apiClient.recordDailySurvey({
        waterData: {
          amount: recordedData.waterAmount, // Assuming waterAmount is a number
          unit: recordedData.waterUnit,    // Assuming waterUnit is a string
        },
        weightData: recordedData.weight,    // Assuming weight is a number
        moodData: recordedData.mood,        // Assuming mood is a string
        // Add other data fields as needed
      });

      if (data) {
        // Handle successful response
        console.log('Submission successful:', data);
        setError(null); // Clear any previous errors
      } else {
        // Handle error response
        console.error('Error:', error);
        if (error && error.status === 400) {
          setError("Today's input has already been recorded.");
        } else {
          setError('An error occurred while recording the daily input.');
        }
      }
    } catch (error) {
      // Handle unexpected errors
      console.error('Unexpected error:', error);
      setError('An unexpected error occurred.');
    }
  };

  return (
    <>
      {modalIsOpen && <MealInput setModalIsOpen={setModalIsOpen} />}
      <div className={modalIsOpen ? 'user-dashboard blurred' : 'user-dashboard'}>
        <h1>ACTIVITY LOGGER</h1>
        <div className='user-dashboard-columns'>
          <div className='user-dashboard-column meal-tracker'>
            <MealTracker isMealInputModalOpen={modalIsOpen} setMealInputModalOpen={setModalIsOpen} />
          </div>

          <div className='user-dashboard-column'>
            <WaterInputModal setRecordedData={setRecordedData} />
            <WeightInputModal setRecordedData={setRecordedData} />
            <MoodInputModal setRecordedData={setRecordedData} />
          </div>

          <div>
            <WeightGraph />
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className='user-dashboard-btn' onClick={handleSubmission}>
          <BlueSubmitButton />
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
