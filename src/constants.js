// API URLs
const PRODUCTION_API_BASE_URL = 'https://cs490-exerciseproj-backend.azurewebsites.net'
const DEVELOPMENT_API_BASE_URL = 'http://localhost:1313'

// UI URLs
const PRODUCTION_UI_BASE_URL = 'https://proud-wave-0acf20910.4.azurestaticapps.net/'
const DEVELOPMENT_UI_BASE_URL = 'http://localhost:3000'

// set to true for production, false for development
const isProduction = true

// export URLs based on the environment
const BASE_URLS = {
  API_BASE_URL: isProduction ? PRODUCTION_API_BASE_URL : DEVELOPMENT_API_BASE_URL,
  UI_BASE_URL: isProduction ? PRODUCTION_UI_BASE_URL : DEVELOPMENT_UI_BASE_URL,
}

export default BASE_URLS
