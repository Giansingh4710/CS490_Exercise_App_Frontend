import './ExploreCoachesPage.css'
import { useState, useEffect } from 'react'
import { useAuthContext } from '../../contexts/auth'
import React from 'react'
import apiClient from '../../services/apiClient'
import CoachesOverview from './CoachesOverview/CoachesOverview'
import CoachView from './CoachView/CoachView'
import RequestCoachModal from './RequestCoachModal/RequestCoachModal'
import Messaging from '../ExploreComponents/Messaging/Messaging'

export default function ExploreCoaches() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // coaches state: all coaches
  const [coaches, setCoaches] = useState([])
  // sentRequests state: holds the unanswered requests that the user has sent out, an array of request objects
  const [sentRequests, setSentRequests] = useState([])
  // coachesToDisplay: an array of coach objects that are to be displayed, based on selected tab, filters & search term
  const [coachesToDisplay, setCoachesToDisplay] = useState([])
  // selectedCoach: the selected coach that a user has clicked on
  const [selectedCoach, setSelectedCoach] = useState({})
  // requestStatusForSelectedCoach state: the status of the request for a selected coach
  const [requestStatusForSelectedCoach, setRequestStatusForSelectedCoach] = useState('')
  // requestModalIsOpen state: boolean state that determines whether the Request Coach modal should be open or not
  const [requestModalIsOpen, setRequestModalIsOpen] = useState(false)
  // messageModalIsOpen state: boolean state that determines whether the Message modal should be open or not
  const [messageModalIsOpen, setMessageModalIsOpen] = useState(false)
  // specializations state: the list of specializations from back end
  const [specializations, setSpecializations] = useState(['Any Specialization'])
  // showErrorDialog state: the error text to display if there is an error sending a request
  const [showErrorDialog, setShowErrorDialog] = useState(false)
  // user: the logged in user
  const { user } = useAuthContext()

  // fetchSpecializations function: gets the specializations from backend
  const fetchSpecializations = async () => {
    try {
      const { data, error } = await apiClient.getCoachSpecializations()
      const specializationList = data?.map((spec) => spec.specialties)
      setSpecializations(['Any Specialization', ...specializationList])
    } catch (error) {
      setSpecializations(['Any Specialization'])
    }
  }

  // fetchAllCoaches function: sets coaches & coachesToDisplay to all the coaches
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

  // fetchSentRequests function: sets sentRequests to the open requests that have not been answered yet for the user
  const fetchSentRequests = async () => {
    setIsLoading(true)
    setError(null)

    const { data, error } = await apiClient.getOpenRequestsForClient()
    console.log('SENT REQUESTS:', data)

    if (data) {
      setSentRequests(data)
    }
    if (error) {
      setSentRequests([])
    }
    setIsLoading(false)
  }

  // fetchRequestStatus function: given a coachID, gets the request status between the user and the coachID, and updates requestStatForSelectedCoach based on that
  const fetchRequestStatus = async (coachID) => {
    if (coachID && user.id) {
      const { data, error } = await apiClient.getRequestStatus({
        userID: user.id,
        coachID: coachID,
      })
      if (data) {
        console.log('THE REQUEST STATUS in this func:', data)
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
  }

  // useEffect on mount: fetch all needed data & set the selectedCoach to null
  useEffect(() => {
    fetchAllCoaches()
    fetchSentRequests()
    fetchSpecializations()
    setSelectedCoach(null)
  }, [])

  // useEffect to get the request status when the selectedCoach changes
  useEffect(() => {
    fetchRequestStatus(selectedCoach?.coachID)
  }, [selectedCoach])

  return (
    <>
      {/* conditionally render the modals to send a request/message a coach */}
      {requestModalIsOpen && (
        <RequestCoachModal
          setRequestModalIsOpen={setRequestModalIsOpen}
          coach={selectedCoach}
          specializations={specializations}
          setShowErrorDialog={setShowErrorDialog}
          fetchRequestStatus={fetchRequestStatus}
          fetchSentRequests={fetchSentRequests}
        />
      )}
      {messageModalIsOpen && (
        <Messaging user={selectedCoach} setModalIsOpen={setMessageModalIsOpen} />
      )}
      {/* conditionally render error dialog box */}
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
      <div
        className={
          // if any of the modals are open, blur & disable the background
          requestModalIsOpen || messageModalIsOpen ? 'explore-coaches blurred' : 'explore-coaches'
        }>
        <div className='explore-coaches-content'>
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
            setRequestModalIsOpen={setRequestModalIsOpen}
            setMessageModalIsOpen={setMessageModalIsOpen}
            requestStatusForSelectedCoach={requestStatusForSelectedCoach}
            setShowErrorDialog={setShowErrorDialog}
            fetchRequestStatus={fetchRequestStatus}
            fetchSentRequests={fetchSentRequests}
          />
        </div>
      </div>
    </>
  )
}
