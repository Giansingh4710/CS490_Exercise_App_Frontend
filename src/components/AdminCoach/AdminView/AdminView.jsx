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
      await apiClient.deleteCoach(selectedCoach.id);
    } catch (error) {
      setError('Error deleting coach');
      console.error(error);
    }
  };

  return selectedCoach ? (
    <div className='admin-view'>
      <div className='admin-header'>
        <h2>Coach: {selectedCoach.firstName} {selectedCoach.lastName}</h2>
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