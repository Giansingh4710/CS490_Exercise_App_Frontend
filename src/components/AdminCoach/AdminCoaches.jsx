import React, { useState, useEffect } from 'react'
import './AdminCoaches.css'
import AdminOverview from './AdminOverview/AdminOverview'
import AdminView from './AdminView/AdminView'
import apiClient from '../../services/apiClient'
export default function AdminCoaches() {
  const [isLoading, setIsLoading] = useState(false)
  const [pendingCoaches, setPendingCoaches] = useState([]) // Renamed state to pendingCoaches
  const [selectedCoach, setSelectedCoach] = useState(null)
  const fetchPendingCoaches = async () => {
    setIsLoading(true)
    try {
      const response = await apiClient.getAllPendingCoaches()
      const coachesData = response?.data?.map((coach) => ({
        ...coach,
        userID: coach.coachRequestID, // Change this line based on actual data structure
      }))
      setPendingCoaches(coachesData)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching pending coaches:', error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPendingCoaches()
  }, [])

  return (
    <div className='admin-coaches'>
      {isLoading ? (
        <p>Loading Pending Coaches...</p>
      ) : (
        <div className='admin-coaches-container'>
          <div className='admin-overview-container'>
            <AdminOverview
              coaches={pendingCoaches} // Pass pending coaches to AdminOverview
              setSelectedCoach={setSelectedCoach}
            />
          </div>
          <div className='admin-view-container'>
            <AdminView
              selectedCoach={selectedCoach}
              fetchPendingCoaches={fetchPendingCoaches}
              setSelectedCoach={setSelectedCoach}
            />
          </div>
        </div>
      )}
    </div>
  )
}
