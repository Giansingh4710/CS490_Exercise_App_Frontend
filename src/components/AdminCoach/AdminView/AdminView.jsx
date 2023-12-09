import React from 'react';
import './AdminView.css'; // Ensure you have an updated CSS file for this
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
    isLoading ? (
      <div className='admin-view'>
        <h2>Loading Coach Details...</h2>
      </div>
    ) : (
      <div className='admin-view'>
        <div className='admin-header'>
          <h2>Coach: {selectedCoach.firstName} {selectedCoach.lastName}</h2>
          <div className='coach-details'>
            <p>Location: {selectedCoach.city}, {selectedCoach.state}</p>
            <p>Area of Expertise: {selectedCoach.specialties}</p>
          </div>
          <button className='delete-btn' onClick={handleDeleteCoach}>
            Remove Coach
          </button>
        </div>
      </div>
    )
  ) : (
    <div className='admin-view'>
      <h2>Select a Coach to View Details</h2>
    </div>
  );
}
