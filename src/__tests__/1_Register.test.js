const { Builder, By, Key } = require('selenium-webdriver')
const assert = require('assert')
import BASE_URLS from '../constants'
const baseURL = BASE_URLS.UI_BASE_URL

// Automated UI testing for register & initial survey features
//  Visitor can register as a client (1)
//  Visitor can request to sign up as a Fitness Instructor (Coach) (1)
describe('RegisterPage Tests', function () {
  let driver
  console.log('BASEURL', baseURL)
  beforeAll(async function () {
    driver = await new Builder().forBrowser('chrome').build()
  })
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
    await driver.findElement(By.name('email')).sendKeys('client@gmail.comm')
    await driver.findElement(By.name('password')).sendKeys('12345678', Key.RETURN)
    await driver.findElement(By.name('confirm_password')).sendKeys('12345678', Key.RETURN)

    await driver.sleep(3000)
    const currentUrl = await driver.getCurrentUrl()
    const expectedUrl = baseURL + '/Register/Survey'
    expect(currentUrl).toBe(expectedUrl)
  })
})

describe('Survey Form Tests', () => {
  let driver
  console.log('BASEURL', baseURL)
  beforeAll(async function () {
    driver = await new Builder().forBrowser('chrome').build()
    await driver.get(baseURL + '/Register/Survey')
  })
  it('Should fill out the survey form', async () => {
    // Fill out the form fields
    await driver.findElement(By.name('firstName')).sendKeys('John')
    await driver.findElement(By.name('lastName')).sendKeys('Doe')
    await driver.findElement(By.name('email')).sendKeys('Doe')
    await driver.findElement(By.name('phoneNum')).sendKeys('Doe')
    await driver.findElement(By.name('dob')).sendKeys('Doe')
    await driver.findElement(By.name('weight')).sendKeys('Doe')
    await driver.findElement(By.name('height')).sendKeys('Doe')
    await driver.findElement(By.name('activityLevel')).sendKeys('Doe')
    await driver.findElement(By.name('goal')).sendKeys('Doe')
    await driver.findElement(By.name('streetAddress')).sendKeys('Doe')
    await driver.findElement(By.name('state')).sendKeys('Doe')
    await driver.findElement(By.name('zipCode')).sendKeys('Doe')
    await driver.findElement(By.name('specialties')).sendKeys('Doe')
    await driver.findElement(By.name('cost')).sendKeys('Doe')
    await driver.findElement(By.name('activityLevel')).sendKeys('Doe')

    // Select dropdowns
    await selectDropdownOption(driver, 'gender', 'Male')
    await selectDropdownOption(driver, 'role', 'Client')
    // Add more dropdown selections as needed

    // Submit the form
    await driver.findElement(By.css('button[type="submit"]')).click()

    // Add assertions here for expected behavior after form submission
  })

  afterAll(() => driver && driver.quit())
})

async function selectDropdownOption(driver, dropdownName, optionText) {
  const dropdown = await driver.findElement(By.name(dropdownName))
  const options = await dropdown.findElements(By.css('option'))
  for (let option of options) {
    const text = await option.getText()
    if (text === optionText) {
      await option.click()
      break
    }
  }
}
