import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import apiClient from './services/apiClient'
import { useAuthContext } from './contexts/auth'
import { AuthContextProvider } from './contexts/auth'
import LandingPage from './components/LandingPage/LandingPage'
import RegistrationPage from './components/RegistrationPage/RegistrationPage'
import LoginPage from './components/LoginPage/LoginPage'
import UserDashboard from './components/userDashboard/UserDashboard'
import SurveyPage from './components/SurveyPage/SurveyPage'
import Sidebar from './components/Sidebar/Sidebar'
import MyCoach from './components/MyCoach/MyCoach'
import ExploreCoaches from './components/ExploreCoachesPage/ExploreCoachesPage'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import NotFound from './components/NotFound/NotFound'
import './index.css'
import ExploreClients from './components/ExploreClientsPage/ExploreClientsPage'
import AdminOverview from './components/AdminCoach/AdminOverview/AdminOverview'
import ManageExerciseBank from './components/ManageExerciseBank/ManageExerciseBank'
import ProfilePage from './components/Profile/ProfilePage'
import MyWorkouts from './components/myWorkouts/myWorkouts'
import AdminCoaches from './components/AdminCoach/AdminCoaches'
import Navbar from './components/Navbar/Navbar'
import { Navigate } from 'react-router-dom'

export function AppContainer() {
  return (
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  )
}

export function App() {
  const { user, setUser } = useAuthContext()
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false)
  useEffect(() => {
    const fetchUserInfo = async () => {
      const { data } = await apiClient.fetchUserFromToken()
      if (data) {
        setUser(data.user)
      }
    }
    const token = localStorage.getItem('fitness_token')

    if (token) {
      apiClient.setToken(token)
      fetchUserInfo()
    }
  }, [setUser])
  return (
    <BrowserRouter>
      <main>
        {user?.email ? (
          <>
            <Sidebar setSidebarIsOpen={setSidebarIsOpen} />
            <Navbar sidebarIsOpen={sidebarIsOpen} />
          </>
        ) : (
          <></>
        )}
        <Routes>
          <Route
            path='/'
            element={
              // user is not logged in (does not have email)
              // default / to landing page
              !user?.email ? (
                <LandingPage />
              ) : // user is logged in and their role is null
              // default / to survey page
              user.role === null ? (
                <SurveyPage />
              ) : // user is logged in, and their role is admin
              // default to / to manage coaches
              user.role === 'Admin' ? (
                <AdminCoaches />
              ) : (
                // else
                // user is logged in, and their role is not null and not admin
                // default / to user dashboard
                <UserDashboard />
              )
            }
          />
          <Route path='/Login' element={user?.email ? <Navigate to='/' /> : <LoginPage />} />
          <Route
            path='/Register'
            element={user?.email ? <Navigate to='/' /> : <RegistrationPage />}
          />
          <Route path='/UserDashboard' element={<ProtectedRoute element={<UserDashboard />} />} />
          <Route path='/MyCoach' element={<ProtectedRoute element={<MyCoach />} />} />
          <Route path='/ExploreCoaches' element={<ProtectedRoute element={<ExploreCoaches />} />} />
          <Route path='/Register/Survey' element={<ProtectedRoute element={<SurveyPage />} />} />
          <Route path='/Workouts' element={<ProtectedRoute element={<MyWorkouts />} />} />
          {/* START Coach Specific Links */}
          <Route path='/MyClients' element={<ProtectedRoute element={<ExploreClients />} />} />
          {/* END Coach Specific Links */}

          {/* START Admin Specific Links */}
          <Route path='/ManageCoaches' element={<ProtectedRoute element={<AdminCoaches />} />} />
          <Route
            path='/ManageExercises'
            element={<ProtectedRoute element={<ManageExerciseBank />} />}
          />
          {/* END Admin Specific Links */}

          <Route path='/Profile' element={<ProtectedRoute element={<ProfilePage />} />} />
          <Route path='/Settings' element={<ProtectedRoute element={<SurveyPage />} />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>,
)
