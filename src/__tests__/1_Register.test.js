const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')
import BASE_URLS from '../constants'
const baseURL = BASE_URLS.UI_BASE_URL
import { selectDropdownOption } from './utils/testHelperFunctions'

jest.setTimeout(30000)

// Automated UI testing for register & initial survey features
//  Visitor can register as a client (1)
//  Visitor can request to sign up as a Fitness Instructor (Coach) (1)
describe('RegisterPage Tests', function () {
  let driver
  beforeAll(async function () {
    driver = await new Builder().forBrowser('chrome').build()
  })
  console.log('BASE URL', baseURL)
  afterAll(() => driver && driver.quit())

  describe('Visitor can register as a client and fill out initial survey ', function () {
    it('Should load the register page and check for elements', async function () {
      await driver.get(baseURL + '/register')
      const registerForm = await driver.findElement(By.css('form'))
      assert(registerForm, 'regiserForm is not present')
      const emailInput = await driver.findElement(By.name('email'))
      const passwordInput = await driver.findElement(By.name('password'))
      const passwordConfirmInput = await driver.findElement(By.name('confirm_password'))

      assert(
        emailInput && passwordInput && passwordConfirmInput,
        'Email or Password fields are missing',
      )
      const registerButton = await driver.findElement(By.css('button'))
      assert(registerButton, 'Register button is not present')
    })

    it('Should be able to submit the form', async function () {
      await driver.findElement(By.name('email')).sendKeys('client@gmail.com')
      await driver.findElement(By.name('password')).sendKeys('12345678', Key.RETURN)
      await driver.findElement(By.name('confirm_password')).sendKeys('12345678', Key.RETURN)

      await driver.sleep(5000)
      const currentUrl = await driver.getCurrentUrl()
      const expectedUrl = baseURL + '/Register/Survey'
      expect(currentUrl).toBe(expectedUrl)
    })

    it('Should fill out the survey form', async () => {
      await driver.findElement(By.name('firstName')).sendKeys('John')
      await driver.findElement(By.name('lastName')).sendKeys('Doe')
      await driver.findElement(By.name('phoneNum')).sendKeys('6097895824')
      await driver.findElement(By.name('dob')).sendKeys('01/01/1990')
      await driver.findElement(By.name('weight')).sendKeys('40')
      await driver.findElement(By.name('height')).sendKeys('65')
      await driver.findElement(By.name('city')).sendKeys('Eagletown')
      await driver.findElement(By.name('streetAddress')).sendKeys('123 Main St')
      await driver.findElement(By.name('zipCode')).sendKeys('08520')

      await selectDropdownOption(driver, 'state', 'New Jersey')
      await selectDropdownOption(driver, 'gender', 'Male')
      await selectDropdownOption(driver, 'role', 'Client')
      await selectDropdownOption(driver, 'activityLevel', 'Sedentary')
      await selectDropdownOption(driver, 'goal', 'Lose Weight')

      await driver.findElement(By.css('button[type="submit"]')).click()

      await driver.sleep(6000)
      const currentUrl = await driver.getCurrentUrl()
      const expectedUrl = baseURL + '/UserDashboard'
      expect(currentUrl).toBe(expectedUrl)
    })

    it('Should log out after registration', async function () {
      const logoutButton = await driver.findElement(By.css('.sidebar-logout-btn'))
      await logoutButton.click()

      await driver.sleep(2000)
      const currentUrl = await driver.getCurrentUrl()
      expect(currentUrl).toBe(baseURL + '/')
    })
  })

  describe('Visitor can register as a coach and fill out initial survey ', function () {
    it('Should load the register page and check for elements', async function () {
      await driver.get(baseURL + '/register')
      const registerForm = await driver.findElement(By.css('form'))
      assert(registerForm, 'regiserForm is not present')
      const emailInput = await driver.findElement(By.name('email'))
      const passwordInput = await driver.findElement(By.name('password'))
      const passwordConfirmInput = await driver.findElement(By.name('confirm_password'))

      assert(
        emailInput && passwordInput && passwordConfirmInput,
        'Email or Password fields are missing',
      )
      const registerButton = await driver.findElement(By.css('button'))
      assert(registerButton, 'Register button is not present')
    })

    it('Should be able to submit the form', async function () {
      await driver.findElement(By.name('email')).sendKeys('coach@gmail.com')
      await driver.findElement(By.name('password')).sendKeys('12345678', Key.RETURN)
      await driver.findElement(By.name('confirm_password')).sendKeys('12345678', Key.RETURN)

      await driver.sleep(5000)
      const currentUrl = await driver.getCurrentUrl()
      const expectedUrl = baseURL + '/Register/Survey'
      expect(currentUrl).toBe(expectedUrl)
    })

    it('Should fill out the survey form', async () => {
      await driver.findElement(By.name('firstName')).sendKeys('John')
      await driver.findElement(By.name('lastName')).sendKeys('Doe')
      await driver.findElement(By.name('phoneNum')).sendKeys('6097895824')
      await driver.findElement(By.name('dob')).sendKeys('01/01/1990')
      await driver.findElement(By.name('weight')).sendKeys('40')
      await driver.findElement(By.name('height')).sendKeys('65')
      await driver.findElement(By.name('city')).sendKeys('Eagletown')
      await driver.findElement(By.name('streetAddress')).sendKeys('123 Main St')
      await driver.findElement(By.name('zipCode')).sendKeys('08520')

      await selectDropdownOption(driver, 'state', 'New Jersey')
      await selectDropdownOption(driver, 'gender', 'Male')
      await selectDropdownOption(driver, 'role', 'Coach')
      await selectDropdownOption(driver, 'activityLevel', 'Sedentary')
      await selectDropdownOption(driver, 'goal', 'Lose Weight')

      // coach specific rendered elements:
      await selectDropdownOption(driver, 'specialties', 'Lose Weight')
      await driver.findElement(By.name('cost')).sendKeys('120')
      await driver.findElement(By.css('button[type="submit"]')).click()

      await driver.sleep(5000)
      const currentUrl = await driver.getCurrentUrl()
      const expectedUrl = baseURL + '/UserDashboard'
      expect(currentUrl).toBe(expectedUrl)
    })

    it('Should log out after registration', async function () {
      const logoutButton = await driver.findElement(By.css('.sidebar-logout-btn'))
      await logoutButton.click()

      await driver.sleep(2000)
      const currentUrl = await driver.getCurrentUrl()
      expect(currentUrl).toBe(baseURL + '/')
    })
  })
})
