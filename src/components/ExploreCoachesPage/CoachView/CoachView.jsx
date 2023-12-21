import React from 'react'
import './CoachView.css'
import apiClient from '../../../services/apiClient'
import { useState, useEffect } from 'react'
import { BlueButton, MailIconButton, RedButton } from '../../Buttons/Buttons'
import { useAuthContext } from '../../../contexts/auth'

export default function CoachView({
  selectedCoach,
  loading,
  setRequestModalIsOpen,
  setMessageModalIsOpen,
  requestStatusForSelectedCoach,
  fetchRequestStatus,
  fetchSentRequests,
}) {
  const [error, setError] = useState('')
  const [isRequestPending, setIsRequestPending] = useState(false)

  useEffect(() => {
    if (
      requestStatusForSelectedCoach?.exists &&
      requestStatusForSelectedCoach?.status === 'Pending'
    ) {
      setIsRequestPending(true)
    } else {
      setIsRequestPending(false)
    }
  }, [requestStatusForSelectedCoach])

  const { user } = useAuthContext()
  const handleOnRequestClick = async () => {
    if (user.role === null || user.role === '') {
      setError('Please fill out initial survey on dashboard before requesting a coach.')
    } else {
      setError('')
      setRequestModalIsOpen(true)
    }
  }

  const handleOnCancelClick = async () => {
    const { data, error } = await apiClient.cancelRequest(requestStatusForSelectedCoach?.requestID)
    if (data) {
      setIsRequestPending(false)
      fetchRequestStatus()
      fetchSentRequests()
    }
    if (error) {
      console.error('ERROR canceling:', error)
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

            {/*if there is no request pending, show request & message button, otherwise show cancel button*/}
            {isRequestPending ? (
              <div className='buttons'>
                <MailIconButton handleOnClick={() => setMessageModalIsOpen(true)} />
                <RedButton
                  handleOnClick={handleOnCancelClick}
                  title='Cancel your outgoing request'
                  text='CANCEL'
                />
              </div>
            ) : (
              <BlueButton handleOnClick={handleOnRequestClick} text='REQUEST' />
              // <BlueRequestButton handleOnClick={handleOnRequestClick} />
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
