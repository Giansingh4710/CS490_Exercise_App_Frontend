import React from 'react'
import './CoachView.css'
import apiClient from '../../../services/apiClient'
import { useState, useEffect } from 'react'
import { BlueRequestButton, GreenAcceptButton, RedDeclineButton } from '../../Buttons/Buttons'

export default function CoachView({
  selectedCoach,
  setSelectedCoach,
  loading,
  setLoading,
  setModalIsOpen,
}) {
  const [error, setError] = useState('')

  const handleOnRequestClick = async () => {
    setModalIsOpen(true)
  }
  const handleOnDeclineClick = async () => {
    setModalIsOpen(true)
  }
  const handleOnAcceptClick = async () => {
    setModalIsOpen(true)
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
          <div className='coach-header'>
            <h2>
              {selectedCoach?.firstName} {selectedCoach?.lastName}
            </h2>
            <BlueRequestButton handleOnClick={handleOnRequestClick} />
            <RedDeclineButton handleOnClick={handleOnDeclineClick} />
            <GreenAcceptButton handleOnClick={handleOnAcceptClick} />
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
