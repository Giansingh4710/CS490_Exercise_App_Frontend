import React from 'react';
import './AdminOverview.css';
import apiClient from '../../../services/apiClient'; 
import { useEffect, useState } from 'react';


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
        <CoachCard key={coach.coachRequestID} coach={coach} onSelectCoach={onSelectCoach} />
      ))}
    </div>
  );
}

function CoachCard({ coach, onSelectCoach }) {
  const handleOnCoachClick = async () => {
    try {
      const { data } = await apiClient.getCoachByID(coach.coachRequestID);
      onSelectCoach(data);
    } catch (error) {
      console.error('Failed to fetch coach details:', error);
    }
  };

  return (
    <div className='coach-card' onClick={handleOnCoachClick}>
      <p>{coach?.firstName} {coach.lastName}</p>
    </div>
  );
}