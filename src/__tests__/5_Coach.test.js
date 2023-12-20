const { Builder, By, Key } = require('selenium-webdriver')
const assert = require('assert')
import BASE_URLS from '../constants'
const baseURL = BASE_URLS.UI_BASE_URL
import { loginAsCoach } from './utils/testHelperFunctions'
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
  it('Coach can accept/decline new clients requests', async function () {
    await driver.get(baseURL + '/MyClients')
  })
  it('Coach can view list of their clients', async function () {
    await driver.get(baseURL + '/MyClients')

    // const coachListBefore = await driver.findElements(By.css('.coach-card'))
    // let coachListLengthBefore = coachListBefore.length
    // await driver.wait(until.elementLocated(By.css('.filter-container')), 10000)

    // const specializationDropdown = await driver.findElement(By.name('specialization'))
    // const specializationOption = specializationDropdown.findElement(
    //   By.css('option[value="Train for a sport"]'),
    // ) // Example value
    // await specializationOption.click()

    // // Set a maximum price
    // const priceInput = await driver.findElement(By.name('selectPrice'))
    // await priceInput.sendKeys('100') // Example value

    // // Select a state
    // const stateDropdown = await driver.findElement(By.name('state'))
    // const stateOption = stateDropdown.findElement(By.css('option[value="California"]')) // Example value
    // await stateOption.click()

    // const coachListAfter = await driver.findElements(By.css('.coach-card'))
    // let coachListLengthAfter = coachListAfter.length

    // assert(coachListLengthAfter != coachListLengthBefore)
  })
  it('Coach can send messages to Client', async function () {
    await driver.get(baseURL + '/MyClients')
  })

  afterAll(() => driver && driver.quit())
  logout(driver)
})
