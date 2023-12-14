import React from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.css'
import { useAuthContext } from '../../contexts/auth'

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <SideBarIcons />
    </div>
  )
}

export function SideBarIcons() {
  const { logoutUser } = useAuthContext()

  return (
    <div className='sidebar-icons'>
      <div className='top-sidebar'>
        <div className='sidebar-logo'>
          <Link to='/'>
            <div className='sidebar-icon'>
              <span className='material-symbols-outlined'>run_circle</span>
              <span className='icon-text'> FITFUSION </span>
            </div>
          </Link>
        </div>

        <Link to='/'>
          <div className='sidebar-icon dashboard'>
            <span className='material-symbols-outlined dashboard'>desktop_windows</span>
            <span className='icon-text'> Dashboard </span>
          </div>
        </Link>
        <Link to='/ExploreCoaches'>
          <div className='sidebar-icon'>
            <span className='material-symbols-outlined'>explore</span>
            <span className='icon-text'> EXPLORE COACHES</span>
          </div>
        </Link>
        <Link to='/MyCoach'>
          <div className='sidebar-icon'>
            <span className='material-symbols-outlined'>group</span>
            <span className='icon-text'> MY COACH </span>
          </div>
        </Link>
        <Link to='/'>
          <div className='sidebar-icon'>
            <span className='material-symbols-outlined'>exercise</span>
            <span className='icon-text'> WORKOUTS </span>
          </div>
        </Link>

        {/* START Coach Specific Links */}
        <Link to='/MyClients'>
          <div className='sidebar-icon'>
            <span class='material-symbols-outlined'>groups_3</span>{' '}
            <span className='icon-text'> MY CLIENTS </span>
          </div>
        </Link>
        {/* END Coach Specific Links */}

        {/* START Admin Specific Links */}
        <Link to='/ManageCoaches'>
          <div className='sidebar-icon'>
            <span class='material-symbols-outlined'>manage_accounts</span>{' '}
            <span className='icon-text'> MANAGE COACHES </span>
          </div>
        </Link>
        <Link to='/ManageExercises'>
          <div className='sidebar-icon'>
            <span class='material-symbols-outlined'>folder_managed</span>
            <span className='icon-text'> MANAGE EXERCISES </span>
          </div>
        </Link>
        {/* END Admin Specific Links */}
      </div>

      <div className='bottom-sidebar'>
        <Link to='/'>
          <div className='sidebar-icon'>
            <span className='material-symbols-outlined'>account_circle</span>
            <span className='icon-text'> PROFILE </span>
          </div>
        </Link>
        <Link to='/'>
          <div className='sidebar-icon'>
            <span className='material-symbols-outlined'>settings</span>
            <span className='icon-text'> SETTINGS </span>
          </div>
        </Link>
        <Link to='/'>
          <div className='sidebar-icon' onClick={logoutUser}>
            <span className='material-symbols-outlined'>logout</span>
            <span className='icon-text'> LOG OUT </span>
          </div>
        </Link>
      </div>
    </div>
  )
}
