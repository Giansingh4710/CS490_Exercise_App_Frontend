import React from 'react'
import './CoachView.css'
import apiClient from '../../../services/apiClient'
import { useState, useEffect } from 'react'

export default function CoachView({
  selectedCoach,
  setSelectedCoach,
  loading,
  setLoading,
  setModalIsOpen,
}) {
  const [error, setError] = useState('')

  const handleOnRequestClick = async () => {
    // handle the request click here
    // waiting for backend
    setModalIsOpen(true)
    console.log('modal is open')
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
              {selectedCoach?.FirstName} {selectedCoach?.LastName}
            </h2>
            <button className='request-btn' onClick={() => handleOnRequestClick()} title='Request'>
              Request
            </button>
          </div>

          <div className='coach-details'>
            <div className='coach-location'>
              <i className='material-icons'>location_on</i>
              <div className='location-text'>
                {selectedCoach?.City}, {selectedCoach?.State}
              </div>
            </div>

            <div className='about-me'>
              <h3 className='about-me-header'>ABOUT ME</h3>
              <div>Specialties: {selectedCoach?.Specialties} </div>
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
