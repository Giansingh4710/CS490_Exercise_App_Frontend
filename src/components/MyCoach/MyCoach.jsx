
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import MyMessagesWithCoach from './MyMessagesWithCoach/MyMessagesWithCoach' // Adjust this path as necessary
import './MyCoach.css'
import apiClient from '../../services/apiClient'
import NoCoachFound from './NoCoach'
import MyAssignedWorkouts from './MyAssignedWorkouts/MyAssignedWorkouts'

function MyCoach() {
  const [showMessaging, setShowMessaging] = useState(false)
  const [coach, setCoach] = useState(null);
  const [workoutPlan, setWorkoutPlan] = useState({});
  const toggleMessaging = () => setShowMessaging(!showMessaging)

  // add terminate coach backend

  useEffect(() => {
    async function getCoachData(){
      const { data, error } = await apiClient.getCoachData();
      if(data){
        setCoach(data);
      }
      if(error){
        alert("Error getting coach data");
      }
    }

    async function getWorkoutPlan(){
      const { data, error } = await apiClient.getCoachAssignedWorkoutPlan();
      if(data){
        setWorkoutPlan(data);
      }
      if(error){
        alert("Error getting workout plan");
      }
    }
    getWorkoutPlan();
    getCoachData();
  }, [])

  return (
    <>
      <Navbar page='MyCoach' />{
      coach ? (
        
        <div className='my-coach'>
          <header className='my-coach-header'>
            <h1>Coach {coach.firstName + ' ' +coach.lastName}</h1>
            <span class='material-symbols-outlined' onClick={toggleMessaging}>
              mail
            </span>
          </header>

          {showMessaging && <MyMessagesWithCoach coach={coach} />}

          <div className='workouts'>
            {Object.keys(workoutPlan).length === 0 ? <h3>Coach {coach.firstName + ' ' + coach.lastName} has not assigned you any workouts.</h3> : <MyAssignedWorkouts></MyAssignedWorkouts>}
          </div>
          <button className='terminate-button'>Terminate Coach {coach.firstName}</button> 
        </div>
      ) : 
      (
        <NoCoachFound></NoCoachFound>
      )
      }
  </>
      )
}

export default MyCoach
