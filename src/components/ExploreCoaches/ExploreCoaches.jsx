import React from 'react'
import './ExploreCoaches.css'
import CoachesOverview from './CoachesOverview/CoachesOverview'
import CoachView from './CoachView/CoachView'
import { useState, useEffect } from 'react'
import apiClient from '../../services/apiClient'

// components broken down:
// ExploreCoaches is the overall page
// CoachOverview is the search/filter area for coaches
// CoachView is the detailed area for a selected coach

export default function ExploreCoaches() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [coaches, setCoaches] = useState([])
  const [selectedCoach, setSelectedCoach] = useState({})
  const [selectedTab, setSelectedTab] = useState('Coaches')
  const [sentRequests, setSelectedRequests] = useState([])

  const fetchAllCoaches = async () => {
    setIsLoading(true)
    setError(null)
    const { data, error } = await apiClient.getAllCoaches()
    if (data) {
      setCoaches(data)
    }
    if (error) {
      setCoaches([])
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchAllCoaches()
    setSelectedCoach(null)
  }, [])
  return (
    <div className='explore-coaches'>
      <CoachesOverview
        coaches={coaches}
        setCoaches={setCoaches}
        setSelectedCoach={setSelectedCoach}
        selectedCoach={selectedCoach}
      />
      <CoachView
        selectedCoach={selectedCoach}
        setSelectedCoach={setSelectedCoach}
        loading={isLoading}
        setLoading={setIsLoading}
      />
    </div>
  )
}
