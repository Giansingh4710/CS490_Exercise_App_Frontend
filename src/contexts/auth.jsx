import { createContext, useContext, useState, useEffect } from 'react'
import apiClient from '../services/apiClient'
const AuthContext = createContext(null)

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({})
  const [initialized, setInitialized] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState()
  const [usersCoachID, setUsersCoachID] = useState('')

  const fetchUsersCoachID = async () => {
    if (user?.role === 'Coach') {
      const { data, error } = await apiClient.getUsersCoachID()
      if (data) {
        setUsersCoachID(data.coachID)
      }
      if (error) {
        setUsersCoachID('')
      }
    }
  }

  useEffect(() => {
    fetchUsersCoachID()
  }, [user])
  const loginUser = async (credentials) => {
    setIsProcessing(true)
    const { data, error } = await apiClient.login(credentials)
    if (data) {
      setUser(data.user)
      apiClient.setToken(data.token)
      localStorage.setItem('fitness_token', data.token)
    }
    if (error) setError(error)
    setIsProcessing(false)
  }

  const registerUser = async (credentials) => {
    setIsProcessing(true)
    const { data, error } = await apiClient.register(credentials)
    if (data) {
      setUser(data.user)
      apiClient.setToken(data.token)
      localStorage.setItem('fitness_token', data.token)
    }
    if (error) setError(error)
    setIsProcessing(false)
  }

  const fetchUserFromToken = async () => {
    setIsProcessing(true)
    const { data } = await apiClient.fetchUserFromToken()
    if (data) {
      setUser(data.user)
    }
    setInitialized(true)
    setIsProcessing(false)
  }

  const logoutUser = async () => {
    setIsProcessing(true)
    setUser({})
    setInitialized(true)
    setError(null)
    setIsProcessing(false)
    apiClient.logoutUser()
  }

  const authValue = {
    user,
    setUser,
    isProcessing,
    setIsProcessing,
    setError,
    initialized,
    setInitialized,
    error,
    loginUser,
    registerUser,
    fetchUserFromToken,
    logoutUser,
  }

  return (
    <AuthContext.Provider value={authValue}>
      <>{children}</>
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
