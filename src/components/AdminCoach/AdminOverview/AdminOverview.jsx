import React from 'react';
import './AdminOverview.css';
import apiClient from '../../../services/apiClient'; 

export default function AdminOverview({ coaches, setSelectedCoach }) {
  return (
    <div className='coaches-overview'>
      <h3>Incoming Coach Requests</h3>
      <CoachList coaches={coaches} onSelectCoach={setSelectedCoach} />
    </div>
  );
}

function CoachList({ coaches, onSelectCoach }) {
  return (
    <div>
      {coaches?.map((coach) => (
        <CoachCard key={coach.userID} coach={coach} onSelectCoach={onSelectCoach} />
      ))}
    </div>
  );
}

function CoachCard({ coach, onSelectCoach }) {
  const handleOnCoachClick = async () => {
    console.log(coach); 
    try {
      const response = await apiClient.getPendingByID(coach.userID);
      if (response.data && response.data.length > 0) {
        onSelectCoach(response.data[0]);
      } else {
        console.error('No coach details found');
        // Optionally set an error state here to inform the user
      }
    } catch (error) {
      console.error('Failed to fetch coach details:', error);
      // Optionally set an error state here to inform the user
    }
  };

  return (
    <div className='coach-card' onClick={handleOnCoachClick}>
      <p><strong>Name:</strong> {coach?.firstName} {coach?.lastName}</p>
      <p><strong>Specialties:</strong> {coach?.specialties}</p>
      <p><strong>Cost:</strong> ${coach?.cost}</p>
    </div>
  );
}
