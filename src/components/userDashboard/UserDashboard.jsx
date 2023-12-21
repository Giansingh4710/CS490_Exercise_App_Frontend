import React, { useState, useEffect } from 'react'
import apiClient from '../../services/apiClient.js'
import { BlueButton } from '../Buttons/Buttons.jsx'
import WaterInputModal from './waterInput/waterInput.js'
import WeightInputModal from './weightInput/weightInput.jsx'
import MealTracker from '../userDashboard/mealTable/mealTable.js'
import MoodInputModal from './moodInput/moodInput.jsx'
import MealInput from './mealInput/mealInput.js'
import WeightGraph from './weightGraph/weightGraph.jsx'
import './UserDashboard.css'

function UserDashboard() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [recordedData, setRecordedData] = useState({})
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [alreadyRecordedMessage, setAlreadyRecordedMessage] = useState(null)

  const handleSubmission = async () => {
    try {
      console.log('Recorded Data:', recordedData)

      const { data, error } = await apiClient.recordDailySurvey({
        waterData: {
          amount: recordedData.waterAmount,
          unit: recordedData.waterUnit,
        },
        weightData: recordedData.weight,
        moodData: recordedData.mood,
      })

      if (data) {
        setSuccessMessage("Today's survey has been recorded successfully.")
        setAlreadyRecordedMessage(null)
        setError(null)
      } else {
        console.error('Error:', error)
        if (error && error.status === 400) {
          setAlreadyRecordedMessage("Today's survey has already been recorded.")
          setSuccessMessage(null)
          setError(null)
        } else {
          setError('An error occurred while recording the daily input.')
          setSuccessMessage(null)
          setAlreadyRecordedMessage(null)
        }
      }
    } catch (error) {
      console.error('Unexpected error:', error)
      setError('An unexpected error occurred.')
      setSuccessMessage(null)
      setAlreadyRecordedMessage(null)
    }
  }

  useEffect(() => {
    const messageTimeout = setTimeout(() => {
      setSuccessMessage(null)
      setAlreadyRecordedMessage(null)
      setError(null)
    }, 5000)

    return () => {
      clearTimeout(messageTimeout)
    }
  }, [successMessage, alreadyRecordedMessage, error])

  return (
    <>
      {modalIsOpen && <MealInput setModalIsOpen={setModalIsOpen} />}
      <div className={modalIsOpen ? 'user-dashboard blurred' : 'user-dashboard'}>
        <div className='user-dashboard-columns'>
          <div className='user-dashboard-column meal-tracker'>
            <MealTracker
              isMealInputModalOpen={modalIsOpen}
              setMealInputModalOpen={setModalIsOpen}
            />
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
        <div className='message-container'>
          {error && <p className='error-message'>{error}</p>}
          {successMessage && <p className='success-message'>{successMessage}</p>}
          {alreadyRecordedMessage && <p className='info-message'>{alreadyRecordedMessage}</p>}
        </div>
        <div className='user-dashboard-btn' onClick={handleSubmission}>
          <BlueButton handleOnClick={handleSubmission} text='SUBMIT' />
        </div>
      </div>
    </>
  )
}

export default UserDashboard
