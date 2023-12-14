
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import MyMessagesWithCoach from './MyMessagesWithCoach/MyMessagesWithCoach' // Adjust this path as necessary
import './MyCoach.css'
import apiClient from '../../services/apiClient'
import NoCoachFound from './NoCoach'

function MyCoach() {
  const [showMessaging, setShowMessaging] = useState(false)
  const [coach, setCoach] = useState(null);
  const [workoutPlan, setWorkoutPlan] = useState({});
  const toggleMessaging = () => setShowMessaging(!showMessaging)

  useEffect(() => {
    async function getCoachData(){
      const coachData = await apiClient.getCoachData();
      setCoach(coachData.data);
    }

    async function getWorkoutPlan(){
      const plan = await apiClient.getWorkoutPlan();
      setWorkoutPlan(plan.data);
    }
    getWorkoutPlan();
    getCoachData();
  }, [])

  return (
  coach ? (
    <div className='my-coach'>
      <Navbar page='MyCoach' />

      <header className='my-coach-header'>
        <h1>Coach {coach.firstName + ' ' +coach.lastName}</h1>
        <span class='material-symbols-outlined' onClick={toggleMessaging}>
          mail
        </span>
      </header>

      {showMessaging && <MyMessagesWithCoach coach={coach} />}

      <div className='workouts'>
        {console.log(Object.entries(workoutPlan))}
        {Object.entries(workoutPlan).map(([day, exercise]) => (
          <div key={day} className='workout-day'>{day.toUpperCase()}
            {
              exercise.map((exercise, index) => (

                <table class='workout-card'>
                  <tr>
                    <th>Exercise</th>
                    <th>Set #</th>
                    <th># of Reps</th>
                    <th>Weight</th>
                  </tr>
                  {
                    exercise.reps.map((rep, index) => (
                      <tr>
                      {index === 0 ? <td>{exercise.exercise}</td> : <td></td>}
                      <td>{index+1}</td>
                      <td>{exercise.reps[index]}</td>
                      <td>{exercise.weight} lbs</td>
                    </tr>
                    ))
                  }
                </table>
              ))
            }
          </div>

        ))}
      </div>
      <button className='terminate-button'>Terminate Coach Doe</button>
    </div>
  ) : 
  (
    <NoCoachFound></NoCoachFound>
  )
  
  )
}

export default MyCoach
