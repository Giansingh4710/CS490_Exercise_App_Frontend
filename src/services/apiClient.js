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

  async request({ endpoint, method = `GET`, data = {} }) {
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
      endpoint: `login`,
      method: `POST`,
      data: credentials,
    })
  }
  async register(credentials) {
    return await this.request({
      endpoint: `register`,
      method: `POST`,
      data: credentials,
    })
  }
  async fetchUserFromToken() {
    return await this.request({ endpoint: `auth/me`, method: `GET` })
  }
  logoutUser() {
    this.setToken(null)
    localStorage.setItem(this.tokenName, '')
  }

  // ----------------------- coaches requests ----------------------- //
  async getAllCoaches() {
    return await this.request({
      endpoint: `Coaches/api/coaches`,
      method: `GET`,
    })
  }

  async getAllCoachesBySearchTerm(searchTerm) {
    return await this.request({
      endpoint: `Coaches/api/coaches-search-name?name=${encodeURIComponent(
        searchTerm,
      )}`,
      method: `GET`,
    })
  }

  async getCoachByID(coachID) {
    return await this.request({
      endpoint: `Coaches/${coachID}`,
      method: `GET`,
    })
  }
}

const apiClient = new ApiClient(API_BASE_URL)
export default apiClient
