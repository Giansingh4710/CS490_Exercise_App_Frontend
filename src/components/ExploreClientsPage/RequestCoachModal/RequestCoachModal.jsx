import './RequestCoachModal.css'
import { useState, useEffect, useRef } from 'react'
import { useAuthContext } from '../../../contexts/auth'
import apiClient from '../../../services/apiClient'
import Modal from '../../Modal/Modal'

export default function RequestCoachModal({ coach, setModalIsOpen }) {
  console.log('COACH: ', coach)
  const { user } = useAuthContext()
  const [goal, setGoal] = useState('')
  const [message, setMessage] = useState('')
  console.log('USER:', user)
  const handleOnSubmitClick = async () => {
    const { data, error } = await apiClient.createNewRequestForCoachingFromClient({
      userID: user?.id,
      coachID: coach?.coachID,
      goals: goal,
      note: message,
    })
    if (data) {
      setModalIsOpen(false)
    } else {
      console.log('ERROR sending request')
    }
  }
  const headerName = 'REQUEST COACH ' + coach?.LastName
  console.log('headerName: ', headerName)
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
    <div className='input-field'>
      <label htmlFor='status'>
        Goals:
        <select name='goal' id='goal' onChange={handleOnChange} value={goal}>
          <option value='Lose weight'>Lose weight</option>
        </select>
      </label>
    </div>
  )
}

export function AddMessage({ message, setMessage, coach }) {
  const handleOnChange = (event) => {
    setMessage(event.target.value)
  }
  const messagePlaceholder = 'Introduce yourself or send a message to coach ' + coach?.LastName
  return (
    <div className='input-field'>
      <label htmlFor='message'>
        Note to coach
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
      </label>
    </div>
  )
}
