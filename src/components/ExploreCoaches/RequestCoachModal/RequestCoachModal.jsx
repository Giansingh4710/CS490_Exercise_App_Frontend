import './RequestCoachModal.css'
import { useState, useEffect, useRef } from 'react'
import { useAuthContext } from '../../../contexts/auth'
import apiClient from '../../../services/apiClient'

export default function RequestCoachModal({ coach, setModalIsOpen }) {
  const { user } = useAuthContext()
  const [goal, setGoal] = useState('')
  const [message, setMessage] = useState('')
  console.log('USER:', user)
  const handleOnSubmitClick = async () => {
    apiClient.createNewRequestForCoachingFromClient({
      userID: user?.id,
      coachID: coach.CoachID,
      goals: goal,
      note: message,
    })
    setModalIsOpen(true)
  }
  return (
    <div className='request-coach-modal-background'>
      <div className='request-coach-modal-container'>
        {/* modal header: header text & a close button */}
        <div className='header'>
          <p> REQUEST COACH {coach?.LastName.toUpperCase()}</p>
          <button
            className='close-modal-btn'
            onClick={() => {
              setModalIsOpen(false)
            }}>
            X
          </button>
        </div>

        {/* form area to send a request */}
        <div className='form'>
          <div className='form-area'>
            <div className='column'>
              <AddGoal goal={goal} setGoal={setGoal} />
              <AddMessage message={message} setMessage={setMessage} coach={coach} />
            </div>
          </div>
          {/* cancel and submit buttons */}
          <div className='modal-buttons'>
            <button
              className='cancel'
              onClick={() => {
                setModalIsOpen(false)
              }}>
              Cancel
            </button>
            <button className='submit' onClick={handleOnSubmitClick}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function AddGoal({ goal, setGoal }) {
  const handleOnChange = (event) => {
    setGoal(event.target.value)
  }
  return (
    <div className='add-goal'>
      <label htmlFor='status'>Goals: :</label>
      <select name='goal' id='goal' onChange={handleOnChange} value={goal}>
        <option value='Lose weight'>Lose weight</option>
      </select>
    </div>
  )
}

export function AddMessage({ message, setMessage, coach }) {
  const handleOnChange = (event) => {
    setMessage(event.target.value)
  }
  const messagePlaceholder = 'Introduce yourself or send a message to coach ' + coach?.LastName
  return (
    <div className='request-coach-form-message'>
      <label htmlFor='message'>Note to coach</label>
      <div className='message-box'>
        <textarea
          className='message-input description'
          name='message'
          type='text'
          value={message}
          onChange={handleOnChange}
          placeholder={messagePlaceholder}
          autoComplete='off'
        />
      </div>
    </div>
  )
}
