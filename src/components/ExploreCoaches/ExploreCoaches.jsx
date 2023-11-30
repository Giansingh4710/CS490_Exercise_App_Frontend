import React from 'react'
import { useState, useEffect } from 'react'
import './ExploreCoaches.css'
import CoachesOverview from './CoachesOverview/CoachesOverview'
import CoachView from './CoachView/CoachView'
import apiClient from '../../services/apiClient'

// components broken down:
// ExploreCoaches is the overall page
// CoachOverview is the search/filter area for coaches
// CoachView is the detailed area for a selected coach

export default function ExploreCoaches() {
  const [listOfCoaches, setListOfCoaches] = useState([])
  const [selectedCoach, setSelectedCoach] = useState('')

  const fetchAllCoaches = async () => {
    const { data, error } = await apiClient.getAllCoaches()

    if (data) {
      setListOfCoaches(data)
    }
    if (error) {
      setListOfCoaches([])
    }
  }

  useEffect(() => {
    fetchAllCoaches()
  }, [])
  return (
    <div className='explore-coaches'>
      <CoachesOverview
        listOfCoaches={listOfCoaches}
        setListOfCoaches={setListOfCoaches}
        setSelectedCoach={setSelectedCoach}
        selectedCoach={selectedCoach}
      />
      <CoachView selectedCoach={selectedCoach} />
    </div>
  )
}
