import React from 'react'
import './AdminView.css'
import apiClient from '../../../services/apiClient'
import { GreenButton, RedButton } from '../../Buttons/Buttons'

export default function AdminView({ selectedCoach, fetchPendingCoaches, setSelectedCoach }) {
  const handleDenyCoach = async () => {
    if (selectedCoach && selectedCoach.coachRequestID) {
      try {
        const data = await apiClient.denyCoach(selectedCoach.coachRequestID)
        if (data) {
          fetchPendingCoaches()
          setSelectedCoach(null)
          console.log('Successfully denied coach')
        }
        // window.location.reload(false)
      } catch (error) {
        console.error('Error denying coach:', error)
      }
    }
  }

  const handleAcceptCoach = async () => {
    if (selectedCoach && selectedCoach.coachRequestID) {
      try {
        const data = await apiClient.acceptCoach(selectedCoach.coachRequestID)
        if (data) {
          fetchPendingCoaches()
          setSelectedCoach(null)
          console.log('Successfully accepted coach')
        }
        // window.location.reload(false)
      } catch (error) {
        console.error('Error accepting coach:', error)
      }
    }
  }
  return selectedCoach ? (
    <div className='admin-view'>
      <div className='admin-header'>
        <h2>
          Coach: {selectedCoach.firstName} {selectedCoach.lastName}
        </h2>
        <div className='buttons'>
          <GreenButton handleOnClick={handleAcceptCoach} text='ACCEPT' />
          <RedButton handleOnClick={handleDenyCoach} text='DECLINE' />
        </div>
      </div>

      <div className='coach-details'>
        <div>
          <strong>Cost:</strong>
          <p>{selectedCoach.cost}</p>
        </div>
        <div>
          <strong>Area of Expertise:</strong>
          <p>{selectedCoach.specialties}</p>
        </div>
        <div></div>
      </div>
      {/* Additional functionality like delete button */}
    </div>
  ) : (
    <div className='admin-view'>
      <h2>Select a Coach to View Details</h2>
    </div>
  )
}
