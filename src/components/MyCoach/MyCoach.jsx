
import React, { useState } from 'react';
import Navbar from '../Navbar'; 
import MyMessagesWithCoach from './MyMessagesWithCoach/MyMessagesWithCoach'; // Adjust this path as necessary
import './MyCoach.css';

function MyCoach() {
  const [showMessaging, setShowMessaging] = useState(false);

  const toggleMessaging = () => setShowMessaging(!showMessaging);


  const workouts = {
    monday: [
      { exercise: 'Squat', sets: 3, reps: [10, 8, 10], weight: 120 },
      { exercise: 'Lunges', sets: 3, reps: [10, 8, 10], weight: 120 }
    ],
    tueday: [
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
  <h1>Coach Name</h1>
  <i className="fas fa-envelope" onClick={toggleMessaging}></i> {/* Mail Icon */}
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
    <option value="5">1/5</option>
    <option value="4">2/5</option>
    <option value="3">3/5</option>
    <option value="2">4/5</option>
    <option value="1">5/5</option>
  </select>
  <button className="terminate-button">Terminate Coach Doe</button>
</footer>

    </div>
  );
}

export default MyCoach;