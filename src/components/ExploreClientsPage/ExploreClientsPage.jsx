import React from 'react'
import './ExploreClientsPage.css'
import ClientView from './ClientView/ClientView'
import { useState, useEffect } from 'react'
import apiClient from '../../services/apiClient'
import { Tabs } from '../ExploreComponents/Tabs/Tabs'
import { List, ItemCard } from '../ExploreComponents/ItemList/ItemList'
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
    const { data, error } = await apiClient.getCoachesClients()
    if (data) {
      setClients(data)
      setClientsToDisplay(data)
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
  }, [])

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
          sentRequests={sentRequests}
          fetchSentRequests={fetchSentRequests}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
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

export function ClientsOverview({
  clients,
  setClients,
  setSelectedClient,
  clientsToDisplay,
  setClientsToDisplay,
  sentRequests,
  fetchSentRequests,
  selectedClient,
  selectedTab,
  setSelectedTab,
}) {
  const [searchTerm, setSearchTerm] = useState('')

  //   const [viewFilters, setViewFilters] = useState(false);
  const handleOnRequestsTabClick = () => {
    if (selectedTab == 'Clients') {
      setSelectedTab('Sent Requests')
      setClientsToDisplay(sentRequests)
    }
  }

  const handleOnClientsTabClick = () => {
    if (selectedTab == 'Sent Requests') {
      setSelectedTab('Clients')
      setClientsToDisplay(clients)
    }
  }
  const tabs = [
    { label: 'Clients', handler: handleOnClientsTabClick },
    { label: 'New Requests', handler: handleOnRequestsTabClick },
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
      />
    </div>
  )
}

export function ClientOrSentRequest({
  selectedTab,
  handleOnRequestsTabClick,
  handleOnClientsTabClick,
}) {
  return (
    <div className='clients-or-sent-requests-tab'>
      <div
        className={selectedTab === 'Clients' ? 'clients-tab selected' : 'clients-tab'}
        onClick={handleOnClientsTabClick}>
        <p className='tab'>Clients</p>
      </div>
      <div className='divider'>|</div>
      <div
        className={
          selectedTab === 'Sent Requests' ? 'sent-requests-tab selected' : 'sent-requests-tab'
        }
        onClick={handleOnRequestsTabClick}>
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

export function ClientList({ clients, setSelectedClient, selectedClient, selectedTab }) {
  useEffect(() => {}, [selectedTab])

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
            item={item.Client}
            isSelected={selectedClient?.userID === item?.Client?.userID}
            handleClick={() => handleOnClientClick(item.Coach)}>
            <p>
              {item.Client.firstName} {item.Client.lastName}
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
