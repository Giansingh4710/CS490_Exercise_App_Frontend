// import { inputFields } from '../ExploreCoaches/RequestCoachModal/RequestCoachModal'
import './Modal.css'
import { useState, useEffect, useRef } from 'react'

export default function Modal({ headerName, setModalIsOpen, handleOnSubmitClick, inputFields }) {
  const [goal, setGoal] = useState('')
  const [message, setMessage] = useState('')
  return (
    <div className='modal-background'>
      <div className='modal-container'>
        {/* modal header: header text & a close button */}
        <div className='header'>
          <p> {headerName}</p>
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
            <div className='column'>{inputFields}</div>
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
