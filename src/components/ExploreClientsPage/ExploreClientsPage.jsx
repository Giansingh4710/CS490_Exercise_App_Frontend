import React from 'react'
import './ExploreClientsPage.css'
import { useState, useEffect } from 'react'
import apiClient from '../../services/apiClient'
import { Tabs } from '../ExploreComponents/Tabs/Tabs'
import { List, ItemCard } from '../ExploreComponents/ItemList/ItemList'
import { GreenAcceptButton, RedDeclineButton } from '../Buttons/Buttons'

// components broken down:
// ExploreClients is the overall page
// ClientOverview is the search area for clients
// ClientView is the detailed area for a selected client

export default function ExploreClients() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [clients, setClients] = useState([])
  const [newRequests, setNewRequests] = useState([])
  const [clientsToDisplay, setClientsToDisplay] = useState([])
  const [selectedClient, setSelectedClient] = useState({})
  const [selectedTab, setSelectedTab] = useState('Clients')
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [requestStatusForSelectedClient, setRequestStatusForSelectedCoach] = useState({})
  const [usersCoachID, setUsersCoachID] = useState()

  const fetchUsersCoachID = async () => {
    const { data, error } = await apiClient.getUsersCoachID()
    if (data) {
      setUsersCoachID(data.coachID)
    } else {
      setUsersCoachID('')
    }
  }

  const fetchAllClients = async () => {
    setIsLoading(true)
    setError(null)
    const { data, error } = await apiClient.getCoachesClients()
    if (data) {
      setClients(data)
      setClientsToDisplay(data)
    }
    if (error) {
      setClients([])
      setClientsToDisplay([])
    }
    setIsLoading(false)
  }

  const fetchNewRequests = async () => {
    setIsLoading(true)
    setError(null)
    const { data, error } = await apiClient.getOpenRequestsForCoach()
    if (data) {
      const clients = data.map((item) => item.User)
      setNewRequests(data)
      setClientsToDisplay(clients)
    }
    if (error) {
      setClients([])
      setClientsToDisplay([])
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchUsersCoachID()

    setSelectedClient(null)
  }, [])

  useEffect(() => {
    fetchAllClients()
    fetchNewRequests()
  }, [usersCoachID])

  return (
    <>
      <div className='explore-clients'>
        <ClientsOverview
          clients={clients}
          setClients={setClients}
          setSelectedClient={setSelectedClient}
          selectedClient={selectedClient}
          clientsToDisplay={clientsToDisplay}
          setClientsToDisplay={setClientsToDisplay}
          newRequests={newRequests}
          fetchNewRequests={fetchNewRequests}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        <ClientView
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
          loading={isLoading}
          setLoading={setIsLoading}
          setModalIsOpen={setModalIsOpen}
          clients={clients}
          newRequests={newRequests}
          fetchAllClients={fetchAllClients}
        />
      </div>
    </>
  )
}

export function ClientsOverview({
  clients,
  setClients,
  setSelectedClient,
  clientsToDisplay,
  setClientsToDisplay,
  newRequests,
  fetchNewRequests,
  selectedClient,
  selectedTab,
  setSelectedTab,
}) {
  const [searchTerm, setSearchTerm] = useState('')

  const tabs = [
    {
      label: 'Clients',
      handler: () => {
        if (selectedTab == 'New Requests') {
          setSelectedTab('Clients')
          setClientsToDisplay(clients)
        }
      },
    },
    {
      label: 'New Requests',
      handler: () => {
        if (selectedTab == 'Clients') {
          setSelectedTab('New Requests')
          const clientsFromRequests = newRequests.map((request) => request.User)
          setClientsToDisplay(clientsFromRequests)
        }
      },
    },
  ]

  const handleSearch = async () => {
    try {
      const { data, error } = await apiClient.getAllClientsBySearchTerm(searchTerm)
      setClientsToDisplay(data)
    } catch (error) {
      console.error('Error fetching clients:', error)
      // Handle the error appropriately
    }
  }

  useEffect(() => {
    handleSearch()
  }, [searchTerm])

  return (
    <div className='clients-overview'>
      <Tabs tabs={tabs} activeTab={selectedTab} />
      <SearchForClientByName
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />
      <ClientList
        clients={clientsToDisplay}
        setSelectedClient={setSelectedClient}
        selectedClient={selectedClient}
        selectedTab={selectedTab}
        newRequests={newRequests}
      />
    </div>
  )
}

export function SearchForClientByName({ setSearchTerm, searchTerm, handleSearch }) {
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSearch()
  }
  return (
    <div className='client-search'>
      <form onSubmit={handleSubmit} className='client-search'>
        <input
          className='search-input'
          type='text'
          name='search'
          placeholder='search for a client'
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

export function ClientList({ clients, setSelectedClient, selectedClient, selectedTab }) {
  useEffect(() => {}, [selectedTab])
  console.log('Clients to display:', clients)
  const handleOnClientClick = async (client) => {
    try {
      const { data, error } = await apiClient.getClientByID(client.userID)
      setSelectedClient(data)
    } catch (error) {
      console.log('Failed to fetch client details:', error)
    }
  }

  return (
    <List
      items={clients}
      renderItem={(item, index) =>
        selectedTab === 'New Requests' ? (
          <ItemCard
            key={index}
            item={item}
            isSelected={selectedClient?.userID === item?.userID}
            handleClick={() => handleOnClientClick(item)}>
            <p>
              {item.firstName} {item.lastName}
            </p>
          </ItemCard>
        ) : (
          <ItemCard
            key={index}
            item={item}
            isSelected={selectedClient?.userID === item.userID}
            handleClick={() => handleOnClientClick(item)}>
            <p>
              {item.firstName} {item.lastName}
            </p>
          </ItemCard>
        )
      }
      noAvailableItemsMessage={'No clients available.'}
    />
  )
}
export function ClientCard({ client, selectedClient, setSelectedClient, isLoading, setIsLoading }) {
  const handleOnClientClick = async () => {
    try {
      const { data, error } = await apiClient.getClientByID(client.clientID)
      setSelectedClient(data)
    } catch (error) {
      console.error('Failed to fetch client details:', error)
    }
  }

  return (
    <>
      {isLoading ? (
        <div className='loading-indicator'>Loading...</div>
      ) : (
        <div
          className={
            client.clientID === selectedClient?.clientID
              ? 'client-card client-card-selected'
              : 'client-card'
          }
          onClick={() => handleOnClientClick()}>
          <p>
            {client?.firstName} {client.lastName}
          </p>
        </div>
      )}
    </>
  )
}

export function ClientView({
  selectedClient,
  setSelectedClient,
  loading,
  setLoading,
  setModalIsOpen,
  clients,
  newRequests,
  fetchAllClients,
}) {
  const handleOnDeclineClick = async () => {
    const matchingRequest = newRequests.find(
      (request) => request.User.userID === selectedClient.userID,
    )
    if (matchingRequest) {
      const reqID = matchingRequest.requestID
      try {
        const { data, error } = await apiClient.declineRequest(reqID)
        if (data) {
          console.log('Request declined', data)
        } else if (error) {
          console.error('Error declining request:', error)
        }
      } catch (err) {
        console.error('Error:', err)
      }
    } else {
      console.log('No matching request found for selected client.')
    }
  }
  const handleOnAcceptClick = async () => {
    const matchingRequest = newRequests.find(
      (request) => request.User.userID === selectedClient.userID,
    )
    if (matchingRequest) {
      const reqID = matchingRequest.requestID
      try {
        const { data, error } = await apiClient.acceptRequest(reqID)
        if (data) {
          console.log('Request Accepted', data)
          fetchAllClients()
        } else if (error) {
          console.error('Error accepting request:', error)
        }
      } catch (err) {
        console.error('Error:', err)
      }
    } else {
      console.log('No matching request found for selected client.')
    }
  }

  return selectedClient ? (
    loading ? (
      <>
        <div className='client-view'>
          <div className='client-header'>
            <h2>Loading...</h2>
          </div>
        </div>
      </>
    ) : (
      <>
        <div className='client-view'>
          <div className='client-header'>
            <h2>
              {selectedClient?.firstName} {selectedClient?.lastName}
            </h2>

            <RedDeclineButton handleOnClick={handleOnDeclineClick} />
            <GreenAcceptButton handleOnClick={handleOnAcceptClick} />
          </div>

          <div className='client-details'>
            <div className='client-location'>
              <i className='material-icons'>location_on</i>
              <div className='location-text'>
                {selectedClient?.city}, {selectedClient?.state}
              </div>
            </div>

            <div className='about-me'>
              <h3 className='about-me-header'>ABOUT ME</h3>
              <div>Specialties: {selectedClient?.specialties} </div>
            </div>
          </div>
        </div>
      </>
    )
  ) : (
    <div className='client-view'>
      <div className='client-header'>
        <h2>No client selected</h2>
      </div>
    </div>
  )
}
