import WaterInputModal from './waterInput/waterInput.js';
import WeightInputModal from './weightInput/weightInput.jsx';
import MealTracker from '../userDashboard/mealTable/mealTable.js';
import MoodInputModal from './moodInput/moodInput.jsx';
import MealInput from './mealInput/mealInput.js';
import apiClient from '../../services/apiClient.js';
import { useState } from 'react';
import { BlueSubmitButton } from '../Buttons/Buttons.jsx';
import './UserDashboard.css';

function UserDashboard() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [recordedData, setRecordedData] = useState({});
  const [error, setError] = useState(null);

  const handleSubmission = async () => {
    try {
      const { data, error } = await apiClient.recordDailySurvey({
        waterData: {
          amount: recordedData.waterAmount,
          unit: recordedData.waterUnit,
        },
        weightData: recordedData.weight,
        moodData: recordedData.mood,
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
            <WaterInputModal />
            <WeightInputModal />
            <MoodInputModal setRecordedData={setRecordedData} />
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
