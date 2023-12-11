import WaterInputModal from './waterInput/waterInput.js';
import WeightInputModal from './weightInput/weightInput.jsx';
import MealTracker from '../userDashboard/mealTable/mealTable.js';
import MoodInputModal from './moodInput/moodInput.jsx';
import MealInput from './mealInput/mealInput.js';
import { useState } from 'react';
import { BlueSubmitButton } from '../Buttons/Buttons.jsx';
import './UserDashboard.css';

function UserDashboard() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [recordedData, setRecordedData] = useState({});

  const handleSubmission = () => {
    const token = localStorage.getItem('fitness_token');
    fetch('http://127.0.0.1:1313/logActivity/recordDailySurvey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        waterData: {
          amount: recordedData.waterAmount,
          unit: recordedData.waterUnit,
        },
        weightData: recordedData.weight,
        moodData: recordedData.mood,
      }),
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
        <div className='user-dashboard-btn'  onClick={handleSubmission}>
          <BlueSubmitButton />
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
