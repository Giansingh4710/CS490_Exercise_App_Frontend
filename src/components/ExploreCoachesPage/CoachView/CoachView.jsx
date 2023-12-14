import React from 'react'
import './CoachView.css'
import apiClient from '../../../services/apiClient'
import { useState, useEffect } from 'react'
import {
  BlueCancelButton,
  BlueRequestButton,
  GreenAcceptButton,
  RedDeclineButton,
} from '../../Buttons/Buttons'

export default function CoachView({
  selectedCoach,
  setSelectedCoach,
  loading,
  setLoading,
  setModalIsOpen,
  requestStatusForSelectedCoach,
  notes,
  setShowErrorDialog,
}) {
  console.log('requestStates:', requestStatusForSelectedCoach)
  console.log('Notes:', notes)
  const [error, setError] = useState('')

  const handleOnRequestClick = async () => {
    setModalIsOpen(true)
  }

  const handleOnCancelClick = async () => {
    setModalIsOpen(true)
    // call endpoint to update request to be canceled
  }
  return selectedCoach ? (
    loading ? (
      <>
        <div className='coach-view'>
          {notes !== '' ? (
            <div className='coach-view-notes'>
              {' '}
              <p>{notes}</p>
            </div>
          ) : (
            <></>
          )}

          <div className='coach-header'>
            <h2>Loading...</h2>
          </div>
        </div>
      </>
    ) : (
      <>
        <div className='coach-view'>
          <div className='coach-header'>
            <h2>
              {selectedCoach?.firstName} {selectedCoach?.lastName}
            </h2>
            {/*if request is empty, show request button, otherwise show cancel button*/}
            {requestStatusForSelectedCoach === '' || requestStatusForSelectedCoach === null ? (
              <BlueRequestButton handleOnClick={handleOnRequestClick} />
            ) : (
              <BlueCancelButton handleOnClick={handleOnCancelClick} />
            )}
          </div>

          <div className='coach-details'>
            <div className='coach-location'>
              <i className='material-icons'>location_on</i>
              <div className='location-text'>
                {selectedCoach?.city}, {selectedCoach?.state}
              </div>
            </div>

            <div className='about-me'>
              <h3 className='about-me-header'>ABOUT ME</h3>
              <div>Specialties: {selectedCoach?.specialties} </div>
            </div>
          </div>
        </div>
      </>
    )
  ) : (
    <div className='coach-view'>
      <div className='coach-header'>
        <h2>No coach selected</h2>
      </div>
    </div>
  )
}
