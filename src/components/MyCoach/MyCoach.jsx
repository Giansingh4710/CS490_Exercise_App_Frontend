
import React, { useState } from 'react';
import Navbar from '../Navbar'; 
import MyMessagesWithCoach from './MyMessagesWithCoach/MyMessagesWithCoach'; // Adjust this path as necessary
import './MyCoach.css';

function MyCoach() {
  const [showMessaging, setShowMessaging] = useState(false);

  const toggleMessaging = () => setShowMessaging(!showMessaging);

  // Mock data, replace with your actual data source
  const workouts = {
    monday: [
      { exercise: 'Squat', sets: 3, reps: [10, 8, 10], weight: 120 },
      { exercise: 'Lunges', sets: 3, reps: [10, 8, 10], weight: 120 }
    ],
    Tueday: [
      { exercise: 'Squat', sets: 3, reps: [10, 8, 10], weight: 120 },
      { exercise: 'Lunges', sets: 3, reps: [10, 8, 10], weight: 120 }
    ],
    wednesday: [
      { exercise: 'Squat', sets: 3, reps: [10, 8, 10], weight: 120 },
      { exercise: 'Lunges', sets: 3, reps: [10, 8, 10], weight: 120 }
    ],
    Thursday: [
      { exercise: 'Squat', sets: 3, reps: [10, 8, 10], weight: 120 },
      { exercise: 'Lunges', sets: 3, reps: [10, 8, 10], weight: 120 }
    ],
    Friday: [
      { exercise: 'Squat', sets: 3, reps: [10, 8, 10], weight: 120 },
      { exercise: 'Lunges', sets: 3, reps: [10, 8, 10], weight: 120 }
    ],
    Saturday: [
      { exercise: 'Squat', sets: 3, reps: [10, 8, 10], weight: 120 },
      { exercise: 'Lunges', sets: 3, reps: [10, 8, 10], weight: 120 }
    ],

    Sunday: [
      { exercise: 'Squat', sets: 3, reps: [10, 8, 10], weight: 120 },
      { exercise: 'Lunges', sets: 3, reps: [10, 8, 10], weight: 120 }
    ],

  };


  return (
    <div className="my-coach">
      <Navbar page="MyCoach" />

      <header className="my-coach-header">
        <h1>My Coach</h1>
        <div className="coach-details">
          <h2>Coach Doe</h2>
          <button className="terminate-button">Terminate Coach Doe</button>
          <i className="fas fa-envelope" onClick={toggleMessaging}></i> {/* Mail Icon */}
        </div>
      </header>

      {showMessaging && <MyMessagesWithCoach coachName="Coach Doe" />}

      <div className="workouts">
        {Object.entries(workouts).map(([day, exercises], index) => (
          <div key={index} className="workout-day">
            <h3>{day} - 400 calories burned</h3>
            {exercises.map((exercise, index) => (
              <div key={index} className="exercise">
                <div className="exercise-name">{exercise.exercise}</div>
                <div className="exercise-details">
                  <span>{exercise.sets} sets</span>
                  {/* Map reps and weight if needed */}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <footer className="my-coach-footer">
        <label htmlFor="coach-rating">Rate Coach:</label>
        <select id="coach-rating">
          {/* Options */}
        </select>
      </footer>
    </div>
  );
}

export default MyCoach;