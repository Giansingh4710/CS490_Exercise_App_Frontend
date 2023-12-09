import React from 'react'
import './ExploreCoaches.css'
import CoachesOverview from './CoachesOverview/CoachesOverview'
import CoachView from './CoachView/CoachView'
import { useState, useEffect } from 'react'
import apiClient from '../../services/apiClient'
import RequestCoachModal from './RequestCoachModal/RequestCoachModal'

// components broken down:
// ExploreCoaches is the overall page
// CoachOverview is the search/filter area for coaches
// CoachView is the detailed area for a selected coach

export default function ExploreCoaches() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [coaches, setCoaches] = useState([])
  const [sentRequests, setSentRequests] = useState([])
  const [coachesToDisplay, setCoachesToDisplay] = useState([])
  const [selectedCoach, setSelectedCoach] = useState({})
  const [selectedTab, setSelectedTab] = useState('Coaches')
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const fetchAllCoaches = async () => {
    setIsLoading(true)
    setError(null)
    const { data, error } = await apiClient.getAllCoaches()
    if (data) {
      setCoaches(data)
      setCoachesToDisplay(data)
      console.log('Coaches:', data)
    }
    if (error) {
      // setCoaches([])
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchAllCoaches()
    setSelectedCoach(null)
  }, [])
  console.log('modalIsOpen: ', modalIsOpen)
  return (
    <>
      {/* conditionally render the Modal to send a request  */}
      {modalIsOpen && <RequestCoachModal setModalIsOpen={setModalIsOpen} coach={selectedCoach} />}
      <div className={modalIsOpen ? 'explore-coaches blurred' : 'explore-coaches'}>
        <CoachesOverview
          coaches={coaches}
          setCoaches={setCoaches}
          setSelectedCoach={setSelectedCoach}
          selectedCoach={selectedCoach}
          coachesToDisplay={coachesToDisplay}
          setCoachesToDisplay={setCoachesToDisplay}
          sentRequests={sentRequests}
        />
        <CoachView
          selectedCoach={selectedCoach}
          setSelectedCoach={setSelectedCoach}
          loading={isLoading}
          setLoading={setIsLoading}
          setModalIsOpen={setModalIsOpen}
        />
      </div>
    </>
  )
}
