import React, { useState, useEffect } from 'react';
import './AdminCoaches.css'; // Ensure this CSS file has the styles you need
import AdminOverview from './AdminOverview/AdminOverview'; // Adjust path as necessary
import AdminView from './AdminView/AdminView'; // Adjust path as necessary
import apiClient from '../../services/apiClient';

export default function AdminCoaches() {
  const [isLoading, setIsLoading] = useState(false);
  const [coaches, setCoaches] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState(null);

  useEffect(() => {
    const fetchAllCoaches = async () => {
      setIsLoading(true);
      try {
        const response = await apiClient.getAllCoaches();
        setCoaches(response.data); // Adjust according to your API's response structure
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
          <AdminOverview 
            coaches={coaches} 
            setSelectedCoach={setSelectedCoach} 
          />
          <AdminView 
            selectedCoach={selectedCoach} 
          />
        </div>
      )}
    </div>
  );
}
