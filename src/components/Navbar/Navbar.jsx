import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

export default function Navbar({ sidebarIsOpen }) {
  const location = useLocation()
  const [header, setHeader] = useState('DASHBOARD')

  useEffect(() => {
    const path = location.pathname

    if (path.includes('/MyClients')) {
      setHeader('MY CLIENTS')
    } else if (path.includes('/Register/Survey')) {
      setHeader('INITIAL SURVEY')
    } else if (path.includes('/ManageCoaches')) {
      setHeader('MANAGE COACHES')
    } else if (path.includes('/ManageExercises')) {
      setHeader('MANAGE EXERCISES')
    } else if (path.includes('/Workouts')) {
      setHeader('MY WORKOUTS')
    } else if (path.includes('/MyCoach')) {
      setHeader('MY COACH')
    } else if (path.includes('/ExploreCoaches')) {
      setHeader('EXPLORE COACHES')
    } else if (path.includes('/Settings')) {
      setHeader('SETTINGS')
    } else if (path.includes('/Profile')) {
      setHeader('PROFILE')
    } else {
      setHeader('DASHBOARD')
    }
  }, [location])

  return (
    <div className='navbar'>
      <div className='navbar-content'>
        <div className={sidebarIsOpen ? 'navbar-left-open' : 'navbar-left-closed'}>
          <h>{header}</h>
        </div>

        <div className='navbar-right'>
          <Link to='/Profile'>
            <span className='material-symbols-outlined'>account_circle</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
