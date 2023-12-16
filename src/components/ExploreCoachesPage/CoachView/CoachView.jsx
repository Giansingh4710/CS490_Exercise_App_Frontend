import React from 'react'
import './CoachView.css'
import apiClient from '../../../services/apiClient'
import { useState, useEffect } from 'react'
import { BlueRequestButton, RedCancelButton } from '../../Buttons/Buttons'
import { useAuthContext } from '../../../contexts/auth'

export default function CoachView({
  selectedCoach,
  setSelectedCoach,
  loading,
  setLoading,
  setModalIsOpen,
  requestStatusForSelectedCoach,
  setShowErrorDialog,
  fetchRequestStatus,
  fetchSentRequests,
}) {
  const [error, setError] = useState('')
  const { user } = useAuthContext()
  const handleOnRequestClick = async () => {
    if (user.role === null || user.role === '') {
      setError('Please fill out initial survey on dashboard before requesting a coach.')
    } else {
      setError('')
      setModalIsOpen(true)
    }
  }

  const handleOnCancelClick = async () => {
    if (requestStatusForSelectedCoach.status === 'Pending') {
      const { data, error } = await apiClient.cancelRequest(requestStatusForSelectedCoach.requestID)
      if (data) {
        console.log('Successfully canceled request', data)
        fetchRequestStatus()
        fetchSentRequests()
      }
    }
  }
  return selectedCoach ? (
    loading ? (
      <>
        <div className='coach-view'>
          <div className='coach-header'>
            <h2>Loading...</h2>
          </div>
        </div>
      </>
    ) : (
      <>
        <div className='coach-view'>
          <div className='error'>{error ? <p>{error}</p> : <></>}</div>
          <div className='coach-header'>
            <h2>
              {selectedCoach?.firstName} {selectedCoach?.lastName}
            </h2>

            {/*if request is empty, show request button, otherwise show cancel button*/}
            {requestStatusForSelectedCoach?.exists ? (
              <RedCancelButton
                handleOnClick={handleOnCancelClick}
                title={'Cancel your outgoing request'}
              />
            ) : (
              <BlueRequestButton handleOnClick={handleOnRequestClick} />
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
              <div>Monthly Price: ${selectedCoach?.cost} </div>
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
