import './RequestCoachModal.css'
import { useState } from 'react'
import { useAuthContext } from '../../../contexts/auth'
import apiClient from '../../../services/apiClient'
import Modal from '../../Modal/Modal'

export default function RequestCoachModal({
  setShowErrorDialog,
  coach,
  setRequestModalIsOpen,
  specializations,
  fetchRequestStatus,
  fetchSentRequests,
}) {
  const { user } = useAuthContext()
  const [goal, setGoal] = useState('')
  const [message, setMessage] = useState('')

  const handleOnSubmitClick = async () => {
    const { data, error } = await apiClient.createNewRequestForCoachingFromClient({
      userID: user?.id,
      coachID: coach?.coachID,
      goals: goal,
      note: message,
    })
    if (data) {
      fetchRequestStatus(coach.coachID)
      fetchSentRequests()
      setRequestModalIsOpen(false)
    } else {
      setRequestModalIsOpen(false)
      setShowErrorDialog(true)
    }
  }

  const headerName = 'REQUEST COACH ' + coach?.lastName
  return (
    <Modal
      headerName={headerName}
      setModalIsOpen={setRequestModalIsOpen}
      inputFields={
        <>
          <AddGoal goal={goal} setGoal={setGoal} specializations={specializations} />
          <AddMessage message={message} setMessage={setMessage} coach={coach} />
        </>
      }
      handleOnSubmitClick={handleOnSubmitClick}
    />
  )
}

export function AddGoal({ goal, setGoal, specializations }) {
  const handleOnChange = (event) => {
    setGoal(event.target.value)
  }
  return (
    <div className='input-field'>
      <label htmlFor='status'>
        Goals:
        <select name='goal' id='goal' onChange={handleOnChange} value={goal}>
          {specializations?.map((goal) => (
            <option value={goal}>{goal}</option>
          ))}
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
