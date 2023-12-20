const { Builder, By, Key } = require('selenium-webdriver')
const assert = require('assert')
import BASE_URLS from '../constants'
const baseURL = BASE_URLS.UI_BASE_URL
import { loginAsClient, logout } from './helperFunctions'

// Automated UI testing to test Client features:
//  Client can view list of Coaches and request to hire a Coach (1)
//  Client can filter through Coaches based on specialization/price/location (1)
describe('Client Tests', function () {
  let driver
  beforeAll(async function () {
    driver = await new Builder().forBrowser('chrome').build()
  })
  afterAll(() => driver && driver.quit())

  loginAsClient(driver)

  it('Client can view list of Coaches and request to hire a Coach'), async function () {}

  it('Client can filter through Coaches based on specialization/price/location'),
    async function () {}
  logout(driver)
})
