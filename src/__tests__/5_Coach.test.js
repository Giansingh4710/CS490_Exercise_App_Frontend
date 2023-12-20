const { Builder, By, Key } = require('selenium-webdriver')
const assert = require('assert')
import BASE_URLS from '../constants'
const baseURL = BASE_URLS.UI_BASE_URL
import { loginAsCoach } from './helperFunctions'
// Automated UI testing to test Coach Dashboard features:
//  Coach can accept/decline new clients requests (1)
//  Coach can view list of their clients (1)
//  Coach can send messages to Client (1)
describe('Coach Tests', function () {
  let driver
  beforeAll(async function () {
    driver = await new Builder().forBrowser('chrome').build()
  })
  loginAsCoach(driver)
  it('Coach can accept/decline new clients requests', async function () {})
  it('Coach can view list of their clients', async function () {})
  it('Coach can send messages to Client', async function () {})

  afterAll(() => driver && driver.quit())
  logout(driver)
})
