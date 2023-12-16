import React, { useState, useEffect } from 'react';
import './AdminCoaches.css';
import AdminOverview from './AdminOverview/AdminOverview';
import AdminView from './AdminView/AdminView';
import apiClient from '../../services/apiClient';

export default function AdminCoaches() {
  const [isLoading, setIsLoading] = useState(false);
  const [coaches, setCoaches] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState(null);

  useEffect(() => {
    const fetchAllCoaches = async () => {
      setIsLoading(true);
      try {
        const response = await apiClient.getAllPending();
        setCoaches(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching coaches:", error);
        setIsLoading(false);
      }
    };

    fetchAllCoaches();
  }, []);

 
  return (
    <div className='admin-coaches'>
      {isLoading ? (
        <p>Loading Coaches...</p>
      ) : (
        <div className="admin-coaches-container">
          <div className="admin-overview-container">
            <AdminOverview 
              coaches={coaches} 
              setSelectedCoach={setSelectedCoach} 
            />
          </div>
          <div className="admin-view-container">
            <AdminView 
            
              selectedCoach={selectedCoach} 
            />
          </div>
        </div>
      )}
    </div>
  );
}