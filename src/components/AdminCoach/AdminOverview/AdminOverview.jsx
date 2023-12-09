import React from 'react';
import './AdminOverview.css';
import apiClient from '../../../services/apiClient'; 
import { useEffect, useState } from 'react';

export default function AdminOverview({ coaches }) {
  return (
    <div className='coaches-overview'>
            <h3>Incoming Coach Requests</h3> {}

      <CoachList coaches={coaches} />
    </div>
  );
}

function CoachList({ coaches }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        coaches?.map((coach) => (
          <CoachCard key={coach.CoachID} coach={coach} />
        ))
      )}
    </div>
  );
}

function CoachCard({ coach }) {
  const handleOnCoachClick = async () => {
    try {
      const { data } = await apiClient.getCoachByID(coach.CoachID);
      console.log(data); 
    } catch (error) {
      console.error('Failed to fetch coach details:', error);
    }
  };

  return (
    <div className='coach-card' onClick={handleOnCoachClick}>
      <p>
        {coach?.firstName} {coach.lastName}
      </p>
    </div>
  );
}
