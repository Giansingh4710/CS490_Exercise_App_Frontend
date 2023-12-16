import './ExploreClientsPage.css'
import React from 'react'
import Messaging from '../ExploreComponents/Messaging/Messaging'
import { useState, useEffect } from 'react'
import apiClient from '../../services/apiClient'
import { Tabs } from '../ExploreComponents/Tabs/Tabs'
import { List, ItemCard } from '../ExploreComponents/ItemList/ItemList'
import { GreenAcceptButton, RedDeclineButton, MailIconButton } from '../Buttons/Buttons'
import { useAuthContext } from '../../contexts/auth'
import Modal from '../Modal/Modal'

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
  const [messageModalIsOpen, setMessageModalIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [requestStatusForSelectedClient, setRequestStatusForSelectedCoach] = useState({})
  const [usersCoachID, setUsersCoachID] = useState()
  const [termianteModalIsOpen, setTerminateModalIsOpen] = useState(false)

  const { user } = useAuthContext()
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
      console.log("The data from the fetchAllClients:'", data)
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
      const clients = data?.map((item) => item.User)
      setNewRequests(data)
    }
    if (error) {
      setClients([])
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

  useEffect(() => {
    try {
      const filteredClients = clients.filter(
        (client) =>
          client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.lastName.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setClientsToDisplay(filteredClients)
    } catch (error) {
      console.error('Error fetching clients:', error)
    }
  }, [searchTerm])
  return (
    <>
      {messageModalIsOpen && (
        <Messaging user={selectedClient} setModalIsOpen={setMessageModalIsOpen} />
      )}
      {termianteModalIsOpen && (
        <TerminateClientModal
          setTerminateModalIsOpen={setTerminateModalIsOpen}
          selectedClient={selectedClient}
        />
      )}

      <div
        className={
          messageModalIsOpen || termianteModalIsOpen ? 'explore-clients blurred' : 'explore-clients'
        }>
        <div className='explore-clients-content'>
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
            setMessageModalIsOpen={setMessageModalIsOpen}
            clients={clients}
            newRequests={newRequests}
            fetchAllClients={fetchAllClients}
            requestStatusForSelectedClient={requestStatusForSelectedClient}
          />
        </div>
        {selectedClient && requestStatusForSelectedClient !== 'Pending' ? (
          <div className='terminate-client-area'>
            <p className='terminate-text' onClick={() => setTerminateModalIsOpen(true)}>
              Terminate your contract with {selectedClient?.firstName} {selectedClient?.lastName}
            </p>
          </div>
        ) : (
          <></>
        )}
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
          const clientsFromRequests = newRequests?.map((request) => request.User)
          setClientsToDisplay(clientsFromRequests)
        }
      },
    },
  ]

  const handleSearch = async () => {
    try {
      const filteredClients = clients.filter(
        (client) =>
          client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.lastName.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setClientsToDisplay(filteredClients)
    } catch (error) {
      console.error('Error fetching clients:', error)
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
      console.log('CLIENT:', client)
      const { data, error } = await apiClient.getClientByID(client.userID)
      console.log('CLIENT DATA: ', data)
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
  setMessageModalIsOpen,
  clients,
  newRequests,
  fetchAllClients,
  requestStatusForSelectedClient,
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

            {/*if request is empty, show request button, otherwise show cancel button*/}
            <div className='buttons'>
              <MailIconButton
                user={selectedClient}
                handleOnClick={() => setMessageModalIsOpen(true)}
              />
              {requestStatusForSelectedClient?.exists && (
                <>
                  <RedDeclineButton handleOnClick={handleOnDeclineClick} />
                  <GreenAcceptButton handleOnClick={handleOnAcceptClick} />
                </>
              )}
            </div>
          </div>

          <div className='client-details'>
            <div className='client-location'>
              <i className='material-icons'>location_on</i>
              <div className='location-text'>
                {selectedClient?.city}, {selectedClient?.state}
              </div>
            </div>

            <div className='about-me'>
              <h3 className='about-me-header'>About your client {selectedClient?.firstName}</h3>
              <div>
                {selectedClient?.firstName}'s goal: {selectedClient?.goal}{' '}
              </div>
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

export function TerminateClientModal({ setTerminateModalIsOpen, selectedClient }) {
  const handleOnSubmitClick = async () => {
    console.log('TERMINATE CLINET!')
  }
  const headerName = 'TERMINATE YOUR CLIENT'

  return (
    <Modal
      headerName={headerName}
      setModalIsOpen={setTerminateModalIsOpen}
      inputFields={
        <p className='terminate-client-modal-text'>
          You are about to terminate your coaching contract with {selectedClient?.firstName}
          <br />
          This action is irreversible and will result in the loss of access to
          {selectedClient?.firstName}'s progress and workout details. <br />
          Please confirm you wish to proceed by selecting ‘Confirm’ below
          <br />
          If you need more time to decide, select 'Cancel
        </p>
      }
      handleOnSubmitClick={handleOnSubmitClick}
    />
  )
}
