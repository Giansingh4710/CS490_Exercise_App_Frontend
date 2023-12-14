import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
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

export function AppContainer() {
  return (
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  )
}

export function App() {
  const { user, setUser } = useAuthContext()
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
            <Sidebar />
          </>
        ) : (
          <></>
        )}
        <Routes>
          <Route path='/' element={user?.email ? <UserDashboard /> : <LandingPage />} />
          <Route path='/Login' element={user?.email ? <UserDashboard /> : <LoginPage />} />
          <Route
            path='/Register'
            element={user?.email ? <UserDashboard /> : <RegistrationPage />}
          />
          <Route path='/UserDashboard' element={<ProtectedRoute element={<UserDashboard />} />} />
          <Route path='/MyCoach' element={<ProtectedRoute element={<MyCoach />} />} />
          <Route path='/ExploreCoaches' element={<ProtectedRoute element={<ExploreCoaches />} />} />
          <Route path='/Register/Survey' element={<ProtectedRoute element={<SurveyPage />} />} />

          {/* START Coach Specific Links */}
          <Route path='/MyClients' element={<ProtectedRoute element={<ExploreClients />} />} />
          {/* END Coach Specific Links */}

          {/* START Admin Specific Links */}
          <Route path='/ManageCoaches' element={<ProtectedRoute element={<AdminOverview />} />} />
          <Route
            path='/ManageExercises'
            element={<ProtectedRoute element={<ManageExerciseBank />} />}
          />
          {/* END Admin Specific Links */}

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
