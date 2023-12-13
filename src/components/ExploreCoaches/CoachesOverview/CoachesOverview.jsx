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
        * the filters, & has 3 dropdown componenets Specialization, LocationDropdown, PriceDropdown
       
    CoachList
        * the container that will hold all the coaches available based on the filter and search
    
    Coach Card
        * an individual card that holds the name of the coach 
*/
export default function CoachesOverview({
  coaches,
  setCoaches,
  selectedCoach,
  setSelectedCoach,
  coachesToDisplay,
  setCoachesToDisplay,
  sentRequests,
}) {
  const [viewCoachesOrSentRequests, setViewCoachesOrSentRequests] = useState('Coaches')
  const [searchTerm, setSearchTerm] = useState('')

  //   const [viewFilters, setViewFilters] = useState(false);
  const handleOnSentRequestsTabClick = () => {
    if (viewCoachesOrSentRequests == 'Coaches') {
      setViewCoachesOrSentRequests('Sent Requests')
      setCoachesToDisplay(sentRequests)
    }
  }

  const handleOnCoachesTabClick = () => {
    if (viewCoachesOrSentRequests == 'Sent Requests') {
      setViewCoachesOrSentRequests('Coaches')
      setCoachesToDisplay(coaches)
    }
  }

  const handleSearch = async () => {
    try {
      const { data, error } = await apiClient.getAllCoachesBySearchTerm(searchTerm)
      setCoachesToDisplay(data)
    } catch (error) {
      console.error('Error fetching coaches:', error)
      // Handle the error appropriately
    }
  }

  return (
    <div className='coaches-overview'>
      <CoachOrSentRequest
        viewCoachesOrSentRequests={viewCoachesOrSentRequests}
        handleOnSentRequestsTabClick={handleOnSentRequestsTabClick}
        handleOnCoachesTabClick={handleOnCoachesTabClick}
      />
      <SearchForCoachByName
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />
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

export function SearchForCoachByName({ setSearchTerm, searchTerm, handleSearch }) {
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSearch()
  }
  return (
    <div className='coach-search'>
      <form onSubmit={handleSubmit} className='coach-search'>
        <input
          className='search-input'
          type='text'
          name='search'
          placeholder='search for a coach'
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button className='search-btn'>
          <i className='material-icons'>search</i>
        </button>
      </form>
    </div>
  )
}

export function FilterForCoaches() {
  return (
    <div className='filter-container'>
      <div className='filter-label'>Filters</div>
      <div className='filter-select-container'>
        <SpecializationDropdown />
        <LocationDropdown />
        <MaxPrice />
      </div>
    </div>
  )
}

export function SpecializationDropdown() {
  var specializations = ['lose weight', 'gain muscle', 'train for a sport']
  return (
    <div className='select-dropdown'>
      <select
        required
        name='selectList'
        id='selectList'
        placeholder='Select specialization'
        // onChange={(evt) => setSelectedAvailability(evt.target.value)}
        // value={selectedAvailability}
      >
        {/* <option value="">Example Placeholder</option> */}

        {specializations?.map((c) => (
          <option value={c.id} key={c.id}>
            {c}
          </option>
        ))}
      </select>
    </div>
  )
}
export function LocationDropdown() {
  const locations = [
    { state: 'Any', cities: [] },
    { state: 'CA', cities: ['Calabasas', 'Los Angeles', 'San Diego'] },
    { state: 'NJ', cities: ['Hightstown', 'East Windsor'] },
  ]
  const [selectedState, setSelectedState] = useState('Any')
  const [selectedCity, setSelectedCity] = useState('Any')
  const [cities, setCities] = useState(['Any'])
  const handleOnStateChange = (evt) => {
    setSelectedState(evt.target.value)
  }

  useEffect(() => {
    // Find the selected state object
    const selectedStateObj = locations.find((loc) => loc.state === selectedState)

    // Update cities based on selected state
    if (selectedStateObj) {
      setCities(['Any', ...selectedStateObj.cities])
    }
  }, [selectedState])

  return (
    <div className='select-location-container'>
      <select
        name='selectList'
        id='selectList'
        placeholder='Select state'
        onChange={(evt) => setSelectedState(evt.target.value)}
        value={selectedState}>
        {locations?.map((c) => (
          <option value={c.state} key={c.state}>
            {c.state}
          </option>
        ))}
      </select>
      <select
        name='cityList'
        id='cityList'
        placeholder='Select city'
        value={selectedCity}
        onChange={(evt) => setSelectedCity(evt.target.value)}>
        {cities.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  )
}
export function MaxPrice() {
  var price = ['$100', '$125', 'night']
  return (
    <div className='select-price-dropdown'>
      <input
        name='selectList'
        id='selectList'
        placeholder='Type in a maximum monthly price'
        // onChange={(evt) => setSelectedAvailability(evt.target.value)}
        // value={selectedAvailability}
      />
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
    try {
      const { data, error } = await apiClient.getCoachByID(coach.coachID)
      setSelectedCoach(data)
    } catch (error) {
      console.error('Failed to fetch coach details:', error)
    }
  }

  return (
    <>
      {isLoading ? (
        <div className='loading-indicator'>Loading...</div>
      ) : (
        <div
          className={
            coach.coachID === selectedCoach?.coachID
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
