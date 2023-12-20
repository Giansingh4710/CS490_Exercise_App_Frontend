const { Builder, By, Key } = require('selenium-webdriver')
const assert = require('assert')
import BASE_URLS from '../constants'
const baseURL = BASE_URLS.UI_BASE_URL
import { logout } from './utils/testHelperFunctions'

// Automated UI testing to test login feature for client, coach (both created in the Register tests) and admin (already populated in database)

// client login
describe('Login Page Tests - client login', function () {
  let driver
  console.log('BASEURL', baseURL)
  beforeAll(async function () {
    driver = await new Builder().forBrowser('chrome').build()
  })
  console.log('BASEURL:', baseURL)
  it('Should load the login page and check for elements', async function () {
    await driver.get(baseURL + '/login')
    const loginForm = await driver.findElement(By.tagName('form'))
    assert(loginForm, 'LoginForm is not present')
    const emailInput = await driver.findElement(By.name('email'))
    const passwordInput = await driver.findElement(By.name('password'))
    assert(emailInput && passwordInput, 'Email or Password fields are missing')
    const loginButton = await driver.findElement(By.tagName('button'))
    assert(loginButton, 'Login button is not present')
  })

  it('Should be able to submit the form', async function () {
    await driver.findElement(By.name('email')).sendKeys('client@gmail.com')
    await driver.findElement(By.name('password')).sendKeys('123', Key.RETURN)
    await driver.sleep(4000)
    const currentUrl = await driver.getCurrentUrl()
    const expectedUrl = baseURL + '/  '
    expect(currentUrl).toBe(expectedUrl)
  })
  logout(driver)
  afterAll(() => driver && driver.quit())
})

// coach login
describe('Login Page Tests - coach login', function () {
  let driver
  console.log('BASEURL', baseURL)
  beforeAll(async function () {
    driver = await new Builder().forBrowser('chrome').build()
  })
  console.log('BASEURL:', baseURL)
  it('Should load the login page and check for elements', async function () {
    await driver.get(baseURL + '/login')
    const loginForm = await driver.findElement(By.css('form'))
    assert(loginForm, 'LoginForm is not present')
    const emailInput = await driver.findElement(By.name('email'))
    const passwordInput = await driver.findElement(By.name('password'))
    assert(emailInput && passwordInput, 'Email or Password fields are missing')
    const loginButton = await driver.findElement(By.css('button'))
    assert(loginButton, 'Login button is not present')
  })

  it('Should be able to submit the form', async function () {
    await driver.findElement(By.name('email')).sendKeys('coach@gmail.com')
    await driver.findElement(By.name('password')).sendKeys('123', Key.RETURN)
    await driver.sleep(4000)
    const currentUrl = await driver.getCurrentUrl()
    const expectedUrl = baseURL + '/'
    expect(currentUrl).toBe(expectedUrl)
  })
  logout(driver)

  afterAll(() => driver && driver.quit())
})

// admin login
describe('Login Page Tests - admin login', function () {
  let driver
  console.log('BASEURL', baseURL)
  beforeAll(async function () {
    driver = await new Builder().forBrowser('chrome').build()
  })
  console.log('BASEURL:', baseURL)
  it('Should load the login page and check for elements', async function () {
    await driver.get(baseURL + '/login')
    const loginForm = await driver.findElement(By.tagName('form'))
    assert(loginForm, 'LoginForm is not present')
    const emailInput = await driver.findElement(By.name('email'))
    const passwordInput = await driver.findElement(By.name('password'))
    assert(emailInput && passwordInput, 'Email or Password fields are missing')
    const loginButton = await driver.findElement(By.tagName('button'))
    assert(loginButton, 'Login button is not present')
  })

  it('Should be able to submit the form', async function () {
    await driver.findElement(By.name('email')).sendKeys('admin@fitfusion.com')
    await driver.findElement(By.name('password')).sendKeys('password99', Key.RETURN)
    await driver.sleep(4000)
    const currentUrl = await driver.getCurrentUrl()
    const expectedUrl = baseURL + '/'
    expect(currentUrl).toBe(expectedUrl)
  })
  logout()

  afterAll(() => driver && driver.quit())
})
