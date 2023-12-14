import React from 'react'
import './ClientView.css'
import { GreenAcceptButton, RedDeclineButton } from '../../Buttons/Buttons'

export default function ClientView({
  selectedClient,
  setSelectedClient,
  loading,
  setLoading,
  setModalIsOpen,
}) {
  const handleOnDeclineClick = async () => {
    setModalIsOpen(true)
  }
  const handleOnAcceptClick = async () => {
    setModalIsOpen(true)
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
