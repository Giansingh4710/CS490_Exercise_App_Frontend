import React from 'react';
import './AdminView.css';
import apiClient from '../../../services/apiClient';
import { useState, useEffect } from 'react';

export default function AdminView({ selectedCoach }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedCoach) {
      setIsLoading(false);
    }
  }, [selectedCoach]);

  const handleDeleteCoach = async () => {
    try {
      await apiClient.deleteCoach(selectedCoach.coachRequestID);
    } catch (error) {
      setError('Error deleting coach');
      console.error(error);
    }
  };
  const handleAcceptCoach = async () => {
    try {
      console.log('Accepted:', selectedCoach.coachRequestID);
      // Implement the accept logic here or make an API call
    } catch (error) {
      setError('Error accepting coach');
      console.error(error);
    }
  };

  const handleDenyCoach = async () => {
    try {
      console.log('Denied:', selectedCoach.coachRequestID);
      // Implement the deny logic here or make an API call
    } catch (error) {
      setError('Error denying coach');
      console.error(error);
    }
  };
  return selectedCoach ? (
    <div className='admin-view'>
      <div className='admin-header'>
        
        <h2>Coach: {selectedCoach.firstName} {selectedCoach.lastName}</h2>

        <button onClick={handleAcceptCoach} className="accept-button">Accept</button>
        <button onClick={handleDenyCoach} className="deny-button">Decline</button>
        
      </div>
      
      <div className='coach-details'>
        <div>
          <strong>Location:</strong>
          <p>{selectedCoach.city}, {selectedCoach.state}</p>
        </div>
        <div>
          <strong>Area of Expertise:</strong>
          <p>{selectedCoach.specialties}</p>
        </div>
        <div>
        </div>
      </div>
      {/* Additional functionality like delete button */}
    </div>
  ) : (
    <div className='admin-view'>
      <h2>Select a Coach to View Details</h2>
    </div>
  );
}