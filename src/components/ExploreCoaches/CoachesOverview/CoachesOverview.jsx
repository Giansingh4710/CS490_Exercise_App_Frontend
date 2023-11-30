import React from 'react'
import { useState } from 'react'
import './CoachesOverview.css'
import apiClient from '../../../services/apiClient'
import { useEffect } from 'react'

/*
components broken down:
    CoachesOverveiw 
        * the overall container where a user can search, filter and view the results for coaches 
        * holds all of the following components

    CoachOrSentRequest
        * The heading area, holds 2 tabs, Coaches or Sent Requests, user cna click on either tab
       
    SearchForCoachByName
        * the search bar and button 
       
    FilterForCoaches
        * the filters, & has 3 dropdown componenets ReviewDropdown, LocationDropdown, AvailabilityDropdown
       
    CoachList
        * the container that will hold all the coaches available based on the filter and search
    
    Coach Card
        * an individual card that holds the name of the coach 
*/
export default function CoachesOverview({ coaches, setCoaches, selectedCoach, setSelectedCoach }) {
  const [viewCoachesOrSentRequests, setViewCoachesOrSentRequests] = useState('Coaches')
  //   const [viewFilters, setViewFilters] = useState(false);
  const [coachesToDisplay, setCoachesToDisplay] = useState([])

  const handleOnSentRequestsTabClick = () => {
    if (viewCoachesOrSentRequests == 'Coaches') {
      setViewCoachesOrSentRequests('Sent Requests')
      setCoachesToDisplay([])
    }
  }

  const handleOnCoachesTabClick = () => {
    if (viewCoachesOrSentRequests == 'Sent Requests') {
      setViewCoachesOrSentRequests('Coaches')
      setCoachesToDisplay(coaches)
    }
  }

  return (
    <div className='coaches-overview'>
      <CoachOrSentRequest
        viewCoachesOrSentRequests={viewCoachesOrSentRequests}
        handleOnSentRequestsTabClick={handleOnSentRequestsTabClick}
        handleOnCoachesTabClick={handleOnCoachesTabClick}
      />
      <SearchForCoachByName />
      <FilterForCoaches />
      <CoachList
        coaches={coachesToDisplay}
        setSelectedCoach={setSelectedCoach}
        selectedCoach={selectedCoach}
        viewCoachesOrSentRequests={viewCoachesOrSentRequests}
      />
    </div>
  )
}

export function CoachOrSentRequest({
  viewCoachesOrSentRequests,
  handleOnSentRequestsTabClick,
  handleOnCoachesTabClick,
}) {
  return (
    <div className='coaches-or-sent-requests-tab'>
      <div
        className={viewCoachesOrSentRequests === 'Coaches' ? 'coaches-tab selected' : 'coaches-tab'}
        onClick={handleOnCoachesTabClick}>
        <p className='tab'>Coaches</p>
      </div>
      <div className='divider'>|</div>
      <div
        className={
          viewCoachesOrSentRequests === 'Sent Requests'
            ? 'sent-requests-tab selected'
            : 'sent-requests-tab'
        }
        onClick={handleOnSentRequestsTabClick}>
        <p className='tab'>Sent Requests</p>
      </div>
    </div>
  )
}

export function SearchForCoachByName() {
  return (
    <div className='coach-search'>
      <input className='search-input' type='text' name='search' placeholder='search for a coach' />
      <button className='search-btn'>
        <i className='material-icons'>search</i>
      </button>
    </div>
  )
}

export function FilterForCoaches() {
  return (
    <div className='filter-container'>
      <div className='filter-label'>Filters</div>
      <div className='filter-select-container'>
        <ReviewDropdown />
        <LocationDropdown />
        <AvailabilityDropdown />
      </div>
    </div>
  )
}

export function ReviewDropdown() {
  var reviews = ['☆+', '☆☆+', '☆☆☆+', '☆☆☆☆+', '☆☆☆☆☆+']
  return (
    <div className='select-reviews-dropdown'>
      <select
        required
        name='selectList'
        id='selectList'
        placeholder='Select rating'
        // onChange={(evt) => setSelectedAvailability(evt.target.value)}
        // value={selectedAvailability}
      >
        {/* <option value="">Example Placeholder</option> */}

        {reviews?.map((c) => (
          <option value={c.id} key={c.id}>
            {c}
          </option>
        ))}
      </select>
    </div>
  )
}
export function LocationDropdown() {
  var locations = ['AL', 'WV', 'WI', 'WY']
  return (
    <div className='select-location-dropdown'>
      <select
        name='selectList'
        id='selectList'
        placeholder='Select location'
        // onChange={(evt) => setSelectedAvailability(evt.target.value)}
        // value={selectedAvailability}
      >
        {locations?.map((c) => (
          <option value={c} key={c.id}>
            {c}
          </option>
        ))}
      </select>
    </div>
  )
}
export function AvailabilityDropdown() {
  var availability = ['morning', 'afternoon', 'night']
  return (
    <div className='select-availability-dropdown'>
      <select
        name='selectList'
        id='selectList'
        placeholder='Select availability'
        // onChange={(evt) => setSelectedAvailability(evt.target.value)}
        // value={selectedAvailability}
      >
        {availability?.map((c) => (
          <option value={c} key={c.id}>
            {c}
          </option>
        ))}
      </select>
    </div>
  )
}

export function CoachList({ coaches, setSelectedCoach, selectedCoach, viewCoachesOrSentRequests }) {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {}, [viewCoachesOrSentRequests])
  return (
    <div>
      {coaches?.length <= 0 ? (
        <div>No Coaches Available!</div>
      ) : (
        coaches?.map((coach) => (
          <CoachCard
            coach={coach}
            selectedCoach={selectedCoach}
            setSelectedCoach={setSelectedCoach}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            // handleOnCoachClick={() => handleOnCoachClick(coach.CoachID)}
          />
        ))
      )}
    </div>
  )
}
export function CoachCard({ coach, selectedCoach, setSelectedCoach, isLoading, setIsLoading }) {
  const handleOnCoachClick = async () => {
    console.log('BUTTON IN COACH CARD IS BEING CLICKED')
    // setIsLoading(true)
    try {
      const { data, error } = await apiClient.getCoachByID(coach.CoachID)
      setSelectedCoach(data)
      console.log('fetched coach: ', data)
    } catch (error) {
      console.error('Failed to fetch coach details:', error)
      // Handle error appropriately (e.g., show error message to user)
    }
    // setIsLoading(false)
  }

  return (
    <>
      {isLoading ? (
        <div className='loading-indicator'>Loading...</div>
      ) : (
        <div
          className={
            coach.CoachID === selectedCoach?.CoachID
              ? 'coach-card coach-card-selected'
              : 'coach-card'
          }
          onClick={() => handleOnCoachClick()}>
          <p>
            {coach?.firstName} {coach.lastName}
          </p>
        </div>
      )}
    </>
  )
}
