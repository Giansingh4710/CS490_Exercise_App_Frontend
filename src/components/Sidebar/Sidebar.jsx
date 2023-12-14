import React from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.css'
import { useAuthContext } from '../../contexts/auth'
import { link } from 'fs'

export default function Sidebar() {
  const { logoutUser } = useAuthContext()
  const { user } = useAuthContext()

  /* role options: 
      null   => initial survey is not completed, has client access to links
      admin  => access to only the manage coaches and manage exercises link
      coach  => access to all links except admin links 
      client => access to all links except admin links and my clients link
  */
  const role = user?.role

  return (
    <div className='sidebar'>
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

          {role !== 'Admin' && (
            <>
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
                  <span className='icon-text'> MY WORKOUTS </span>
                </div>
              </Link>
            </>
          )}

          {/* START Coach Specific Links */}
          {role === 'Coach' && (
            <Link to='/MyClients'>
              <div className='sidebar-icon'>
                <span class='material-symbols-outlined'>groups_3</span>{' '}
                <span className='icon-text'> MY CLIENTS </span>
              </div>
            </Link>
          )}
          {/* END Coach Specific Links */}

          {/* START Admin Specific Links */}
          {role === 'Admin' && (
            <>
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
            </>
          )}
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
    </div>
  )
}
