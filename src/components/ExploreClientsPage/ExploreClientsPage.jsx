import React from 'react'
import './ExploreClients.css'
import ClientsOverview from './ClientOverview/ClientOverview'
import ClientView from './ClientView/ClientView'
import { useState, useEffect } from 'react'
import apiClient from '../../services/apiClient'
import RequestClientModal from './RequestClientModal/RequestClientModal'

// components broken down:
// ExploreClients is the overall page
// ClientOverview is the search area for clients
// ClientView is the detailed area for a selected client

export default function ExploreClients() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [clients, setClients] = useState([])
  const [sentRequests, setSentRequests] = useState([])
  const [clientsToDisplay, setClientsToDisplay] = useState([])
  const [selectedClient, setSelectedClient] = useState({})
  const [selectedTab, setSelectedTab] = useState('Clients')
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const fetchAllClients = async () => {
    setIsLoading(true)
    setError(null)
    const { data, error } = await apiClient.getClientsClients()
    if (data) {
      setClients(data)
      setClientsToDisplay(data)
      console.log('Clients:', data)
    }
    if (error) {
      setClients([])
    }
    setIsLoading(false)
  }

  const fetchSentRequests = async () => {
    setIsLoading(true)
    setError(null)
    const { data, error } = await apiClient.getOpenRequestsForClient()
    if (data) {
      setSentRequests(data)
      console.log('Clients:', data)
    }
    if (error) {
      setClients([])
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchAllClients()
    fetchSentRequests()
    setSelectedClient(null)
  }, []);

  useEffect(() => {
    fetchSentRequests()
  }, [isModalOpen]);

  return (
    <>
      {/* conditionally render the Modal to send a request  */}
      {modalIsOpen && <RequestClientModal setModalIsOpen={setModalIsOpen} client={selectedClient} />}
      <div className={modalIsOpen ? 'explore-clients blurred' : 'explore-clients'}>
        <ClientsOverview
          clients={clients}
          setClients={setClients}
          setSelectedClient={setSelectedClient}
          selectedClient={selectedClient}
          clientsToDisplay={clientsToDisplay}
          setClientsToDisplay={setClientsToDisplay}
          sentRequests={sentRequests}
          fetchSentRequests={fetchSentRequests}
        />
        <ClientView
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
          loading={isLoading}
          setLoading={setIsLoading}
          setModalIsOpen={setModalIsOpen}
        />
      </div>
    </>
  )
}


export default function ClientsOverview({
  clients,
  setClients,
  setSelectedClient,
  setSelectedClient,
  clientsToDisplay,
  setClientsToDisplay,
  sentRequests,
  fetchSentRequests,
}) {
  const [viewClientsOrSentRequests, setViewClientsOrSentRequests] = useState('Clients')
  const [searchTerm, setSearchTerm] = useState('')

  //   const [viewFilters, setViewFilters] = useState(false);
  const handleOnSentRequestsTabClick = () => {
    if (viewClientsOrSentRequests == 'Clients') {
      setViewClientsOrSentRequests('Sent Requests')
      setClientsToDisplay(sentRequests)
    }
  }

  const handleOnClientsTabClick = () => {
    if (viewClientsOrSentRequests == 'Sent Requests') {
      setViewClientsOrSentRequests('Clients')
      setClientsToDisplay(clients)
    }
  }

  const handleSearch = async () => {
    try {
      const { data, error } = await apiClient.getAllClientsBySearchTerm(searchTerm)
      setClientsToDisplay(data)
    } catch (error) {
      console.error('Error fetching clients:', error)
      // Handle the error appropriately
    }
  }

  return (
    <div className='clients-overview'>
      <ClientOrSentRequest
        viewClientsOrSentRequests={viewClientsOrSentRequests}
        handleOnSentRequestsTabClick={handleOnSentRequestsTabClick}
        handleOnClientsTabClick={handleOnClientsTabClick}
      />
      <SearchForClientByName
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />
      <ClientList
        clients={clientsToDisplay}
        setSelectedClient={setSelectedClient}
        selectedClient={selectedClient}
        viewClientsOrSentRequests={viewClientsOrSentRequests}
      />
    </div>
  )
}

export function ClientOrSentRequest({
  viewClientsOrSentRequests,
  handleOnSentRequestsTabClick,
  handleOnClientsTabClick,
}) {
  return (
    <div className='clients-or-sent-requests-tab'>
      <div
        className={viewClientsOrSentRequests === 'Clients' ? 'clients-tab selected' : 'clients-tab'}
        onClick={handleOnClientsTabClick}>
        <p className='tab'>Clients</p>
      </div>
      <div className='divider'>|</div>
      <div
        className={
          viewClientsOrSentRequests === 'Sent Requests'
            ? 'sent-requests-tab selected'
            : 'sent-requests-tab'
        }
        onClick={handleOnSentRequestsTabClick}>
        <p className='tab'>Sent Requests</p>
      </div>
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

export function ClientList({ clients, setSelectedClient, selectedClient, viewClientsOrSentRequests }) {
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {}, [viewClientsOrSentRequests])
  return (
    <div className='client-list-container'>
      {clients?.length <= 0 ? (
        <div>No Clients Available!</div>
      ) : (
        clients?.map((client) => (
          <ClientCard
            client={client}
            selectedClient={selectedClient}
            setSelectedClient={setSelectedClient}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            // handleOnClientClick={() => handleOnClientClick(client.ClientID)}
          />
        ))
      )}
    </div>
  )
}
export function ClientCard({ client, selectedClient, setSelectedClient, isLoading, setIsLoading }) {
  const handleOnClientClick = async () => {
    try {
      const { data, error } = await apiClient.getClientByID(client.clientID)
      console.log('Selected client: ', data)
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
