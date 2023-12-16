import axios from 'axios'
import API_BASE_URL from '../constants'

class ApiClient {
  constructor(remoteHostUrl) {
    this.remoteHostUrl = remoteHostUrl
    this.token = null
    this.tokenName = 'fitness_token'
  }

  setToken(token) {
    this.token = token
    localStorage.setItem(this.tokenName, token)
  }

  async request({ endpoint, method = 'GET', data = {} }) {
    const url = `${this.remoteHostUrl}/${endpoint}`

    const headers = {
      'Content-Type': 'application/json',
      Authorization: this.token ? `Bearer ${this.token}` : '',
    }

    try {
      const res = await axios({ url, method, data, headers })
      return { data: res.data, error: null }
    } catch (error) {
      console.error({ errorResponse: error.response })
      const message = error?.response?.data?.error
      console.log('message:', message)
      return { data: null, error: message || String(error) }
    }
  }

  // ----------------------- authentication requests ----------------------- //
  async login(credentials) {
    return await this.request({
      endpoint: 'login',
      method: 'POST',
      data: credentials,
    })
  }

  async register(credentials) {
    return await this.request({
      endpoint: 'register',
      method: 'POST',
      data: credentials,
    })
  }
  async registerSurvey(surveyData) {
    return await this.request({
      endpoint: 'register/initalSurvey',
      method: 'POST',
      data: surveyData,
    })
  }
  async fetchUserFromToken() {
    return await this.request({ endpoint: `auth/me`, method: `GET` })
  }
  logoutUser() {
    this.setToken(null)
    localStorage.setItem(this.tokenName, '')
  }

  async deleteAccount() {
    return await this.request({
      endpoint: `user/deleteAccount`,
      method: `DELETE`,
    })
  }

  // --------------- general requests -------------//
  async getRequestStatus(data) {
    return await this.request({
      endpoint: `request/status?userID=${data?.userID}&coachID=${data?.coachID}`,
      method: `GET`,
    })
  }

  async getUserData() {
    return await this.request({
      endpoint: `user/data`,
      method: `GET`,
    })
  }

  // --------------- accept/decline/cancel requests -------------//
  async acceptRequest(requestID) {
    return await this.request({
      endpoint: `request/accept?requestID=${requestID}`,
      method: `GET`,
    })
  }
  async declineRequest(requestID) {
    return await this.request({
      endpoint: `request/decline?requestID=${requestID}`,
      method: `GET`,
    })
  }
  async cancelRequest(requestID) {
    return await this.request({
      endpoint: `request/cancel?requestID=${requestID}`,
      method: `DELETE`,
    })
  }

  // ----------------------- coaches requests ----------------------- //
  async getAllCoaches() {
    return await this.request({
      endpoint: `coaches/getAllCoaches`,
      method: `GET`,
    })
  }

  async getAllExercises() {
    return await this.request({
      endpoint: 'exercises/allExercises', // The API endpoint for fetching all exercises
      method: 'GET',
    })
  }

  async getAllCoachesBySearchTerm(searchTerm) {
    return await this.request({
      endpoint: `coaches/searchByName?name=${encodeURIComponent(searchTerm)}`,
      method: `GET`,
    })
  }

  async getAllCoachesBySearchTermAndFilters(
    searchTerm,
    selectedSpecialization,
    selectedMaxPrice,
    selectedState,
    selectedCity,
  ) {
    console.log(
      'Search terms: ',
      searchTerm,
      selectedSpecialization,
      selectedMaxPrice,
      selectedState,
      selectedCity,
    )
    return await this.request({
      endpoint: `coaches/search?name=${encodeURIComponent(
        searchTerm,
      )}&specialty=${encodeURIComponent(selectedSpecialization)}&maxPrice=${encodeURIComponent(
        selectedMaxPrice,
      )}&state=${encodeURIComponent(selectedState)}&city=${encodeURIComponent(selectedCity)}`,
      method: `GET`,
    })
  }

  async getCoachByID(coachID) {
    return await this.request({
      endpoint: `coaches/${coachID}`,
      method: `GET`,
    })
  }

  // data must include: "userID", "coachID", "goals", "note"
  async createNewRequestForCoachingFromClient(data) {
    console.log(data)
    return await this.request({
      endpoint: `request`,
      method: `POST`,
      data: data,
    })
  }

  // open requests from the logged in CLIENT that has not been answered yet
  async getOpenRequestsForClient() {
    return await this.request({
      endpoint: `request/openClientRequest`,
      method: `GET`,
    })
  }

  async getCoachLocations() {
    return await this.request({
      endpoint: `coaches/cities`,
      method: `GET`,
    })
  }

  async getCoachSpecializations() {
    return await this.request({
      endpoint: `coaches/specializations`,
      method: `GET`,
    })
  }

  // ----------------------- requests to get client info for a coach ----------------------- //
  async getUsersCoachID() {
    return await this.request({
      endpoint: `coaches/getCoachID`,
      method: `GET`,
    })
  }

  // open requests that the logged in COACH has not answered
  async getOpenRequestsForCoach() {
    return await this.request({
      endpoint: `request/openCoachRequests`,
      method: `GET`,
    })
  }

  async getCoachesClients() {
    return await this.request({
      endpoint: `coaches/clients`,
      method: `GET`,
    })
  }

  async getClientByID(clientID) {
    return await this.request({
      endpoint: `coaches/clientInfo?userID=${clientID}`,
      method: `GET`,
    })
  }
  // ----------------------- User Dashboard ----------------------- //
  async recordDailySurvey(data) {
    return await this.request({
      endpoint: `logActivity/recordDailySurvey`,
      method: `POST`,
      data: data,
    })
  }

  async getCoachData() {
    return await this.request({
      endpoint: `user/coach`,
      method: `GET`,
    })
  }

  async mealInput(data) {
    return await this.request({
      endpoint: `meals/mealInput`,
      method: `POST`,
      data: data,
    })
  }

  async getMeals() {
    return await this.request({
      endpoint: `meals`,
      method: `GET`,
    })
  }

  async deleteMeal(mealID) {
    return await this.request({
      endpoint: `meals/${mealID}`,
      method: `DELETE`,
    })
  }

  async dailyweight() {
    return await this.request({
      endpoint: `logActivity/dailyweight`,
      method: `GET`,
    })
  }

  async getMessages(userID) {
    return await this.request({
      endpoint: `messages/${userID}`,
      method: `GET`,
    })
  }

  async sendMessage(data) {
    return await this.request({
      endpoint: `messages`,
      method: `POST`,
      data: data,
    })
  }

  // Workout Plan / Exercises
  async getExerciseData(exerciseID) {
    return await this.request({
      endpoint: `exercises/${exerciseID}`,
      method: `GET`,
    })
  }

  async getCoachAssignedWorkoutPlan() {
    return await this.request({
      endpoint: `workoutPlan/assignedWorkouts`,
      method: `GET`,
    })
  }

  async getPersonalWorkoutPlan() {
    return await this.request({
      endpoint: `workoutPlan/personalWorkouts`,
      method: `GET`,
    })
  }

  async clientAddExerciseToPlan(data) {
    return await this.request({
      endpoint: `workoutPlan/client/addExercise`,
      method: `POST`,
      data: data,
    })
  }

  async getAllPending() {
    return await this.request({
      endpoint: `coachApply/allPending`,
      method: `GET`,
    })
  }

  async deleteExercise(exerciseID) {
    return await this.request({
      endpoint: `exercises/deleteExercise?exerciseID=${exerciseID}`,
      method: 'GET',
    })
  }

  async createNewRequestForCoachingFromClient(data) {
    console.log(data)
    return await this.request({
      endpoint: `request`,
      method: `POST`,
      data: data,
    })
  }
}

const apiClient = new ApiClient(API_BASE_URL)
export default apiClient
