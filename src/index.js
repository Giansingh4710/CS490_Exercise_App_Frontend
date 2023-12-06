import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import apiClient from './services/apiClient'
import { useAuthContext } from './contexts/auth'
import { AuthContextProvider } from './contexts/auth'
import LandingPage from './components/LandingPage/LandingPage'
import RegistrationPage from './components/RegistrationPage/RegistrationPage'
import LoginPage from './components/LoginPage/LoginPage'
import SurveyPage from './components/SurveyPage/SurveyPage'
import UserDashboard from './components/userDashboard/UserDashboard'
import Sidebar from './components/Sidebar/Sidebar'
import MyCoach from './components/MyCoach/MyCoach'
import ExploreCoaches from './components/ExploreCoaches/ExploreCoaches'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import NotFound from './components/NotFound/NotFound'
import './index.css'

export function AppContainer() {
  return (
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  )
}

export function App() {
  const { user, setUser, setIsProcessing } = useAuthContext()

  useEffect(() => {
    const fetchUserInfo = async () => {
      const { data } = await apiClient.fetchUserFromToken()
      if (data) {
        setUser(data.user)
      }
      setIsProcessing(false)
    }
    const token = localStorage.getItem('fitness_token')

    if (token) {
      apiClient.setToken(token)
      fetchUserInfo()
    }
  }, [])

  const ShowSidebar = () => (user?.email ? <Sidebar /> : <></>)

  return (
    <BrowserRouter>
      <main>
        <ShowSidebar />
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
