import './RequestCoachModal.css'
import { useState, useEffect, useRef } from 'react'
import { useAuthContext } from '../../../contexts/auth'
import apiClient from '../../../services/apiClient'
import Modal from '../../Modal/Modal'

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
  const headerName = 'REQUEST COACH ' + coach?.LastName.toUpperCase()
  const inputFieldsElement = inputFields({ goal, setGoal, message, setMessage, coach })

  return (
    <Modal
      headerName={headerName}
      setModalIsOpen={setModalIsOpen}
      inputFields={inputFieldsElement}
      handleOnSubmitClick={handleOnSubmitClick}
    />
  )
}

export function inputFields({ goal, setGoal, message, setMessage, coach }) {
  return (
    <>
      <AddGoal goal={goal} setGoal={setGoal} />
      <AddMessage message={message} setMessage={setMessage} coach={coach} />
    </>
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
