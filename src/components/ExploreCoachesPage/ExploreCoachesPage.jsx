import React from 'react'
import './ExploreCoachesPage.css'
import CoachesOverview from './CoachesOverview/CoachesOverview'
import CoachView from './CoachView/CoachView'
import { useState, useEffect } from 'react'
import apiClient from '../../services/apiClient'
import RequestCoachModal from './RequestCoachModal/RequestCoachModal'
import { useAuthContext } from '../../contexts/auth'

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
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [requestStatusForSelectedCoach, setRequestStatusForSelectedCoach] = useState('')
  const [specializations, setSpecializations] = useState(['Any Specialization'])
  const [showErrorDialog, setShowErrorDialog] = useState(false)
  const { user } = useAuthContext()
  const fetchSpecializations = async () => {
    try {
      const { data, error } = await apiClient.getCoachSpecializations()
      const specializationList = data.map((spec) => spec.specialties)
      setSpecializations(['Any Specialization', ...specializationList])
    } catch (error) {
      setSpecializations(['Any Specialization'])
      throw new Error('Error fetching specializations')
    }
  }
  const fetchAllCoaches = async () => {
    setIsLoading(true)
    setError(null)
    const { data, error } = await apiClient.getAllCoaches()
    if (data) {
      setCoaches(data)
      setCoachesToDisplay(data)
    }
    if (error) {
      setCoaches([])
    }
    setIsLoading(false)
  }

  const fetchSentRequests = async () => {
    setIsLoading(true)
    setError(null)
    const { data, error } = await apiClient.getOpenRequestsForClient()
    if (data) {
      setSentRequests(data)
    }
    if (error) {
      setCoaches([])
    }
    setIsLoading(false)
  }

  const fetchRequestStatus = async (coachID) => {
    const { data, error } = await apiClient.getRequestStatus({
      userID: user.id,
      coachID: coachID,
    })
    if (data) {
      console.log('Request status!:', data)
      if (data?.exists == true) {
        setRequestStatusForSelectedCoach(data)
      } else {
        setRequestStatusForSelectedCoach('')
      }
    }
    if (error) {
      setRequestStatusForSelectedCoach('')
    }
  }

  useEffect(() => {
    fetchAllCoaches()
    fetchSentRequests()
    fetchSpecializations()
    setSelectedCoach(null)
  }, [])

  useEffect(() => {
    fetchSentRequests()
  }, [modalIsOpen])

  useEffect(() => {
    fetchSentRequests()
    console.log('COACHES:', coaches)
  }, [coaches])

  useEffect(() => {
    console.log('Selected coach', selectedCoach)
    fetchRequestStatus(selectedCoach?.coachID)
  }, [selectedCoach])

  return (
    <>
      {/* conditionally render the Modal to send a request  */}
      {modalIsOpen && (
        <RequestCoachModal
          setModalIsOpen={setModalIsOpen}
          coach={selectedCoach}
          specializations={specializations}
          setShowErrorDialog={setShowErrorDialog}
          fetchRequestStatus={fetchRequestStatus}
        />
      )}
      {showErrorDialog && (
        <dialog open>
          <form method='dialog'>
            ERROR SENDING REQUEST
            <button type='submit' autofocus onClick={() => setShowErrorDialog(false)}>
              close
            </button>
          </form>
        </dialog>
      )}
      {error ? (
        <dialog open>
          <form method='dialog'>
            <button type='submit' autofocus>
              close
            </button>
          </form>
        </dialog>
      ) : (
        <></>
      )}
      <div className={modalIsOpen ? 'explore-coaches blurred' : 'explore-coaches'}>
        <CoachesOverview
          coaches={coaches}
          setCoaches={setCoaches}
          setSelectedCoach={setSelectedCoach}
          selectedCoach={selectedCoach}
          coachesToDisplay={coachesToDisplay}
          setCoachesToDisplay={setCoachesToDisplay}
          sentRequests={sentRequests}
          fetchSentRequests={fetchSentRequests}
          setRequestStatusForSelectedCoach={setRequestStatusForSelectedCoach}
          specializations={specializations}
        />
        <CoachView
          selectedCoach={selectedCoach}
          setSelectedCoach={setSelectedCoach}
          loading={isLoading}
          setLoading={setIsLoading}
          setModalIsOpen={setModalIsOpen}
          requestStatusForSelectedCoach={requestStatusForSelectedCoach}
          setShowErrorDialog={setShowErrorDialog}
          fetchRequestStatus={fetchRequestStatus}
          fetchSentRequests={fetchSentRequests}
        />
      </div>
    </>
  )
}
