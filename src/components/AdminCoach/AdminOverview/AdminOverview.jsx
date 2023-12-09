import React from 'react';
import './AdminOverview.css'; // Make sure this path is correct
import apiClient from '../../../services/apiClient'; // Make sure this path is correct
import { useEffect, useState } from 'react';

export default function AdminOverview({ coaches }) {
  return (
    <div className='coaches-overview'>
            <h3>Incoming Coach Requests</h3> {/* Add this line */}

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
      console.log(data); // Here you can decide what to do when a coach is clicked
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
