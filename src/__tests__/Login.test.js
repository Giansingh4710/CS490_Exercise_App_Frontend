const { Builder, By, Key } = require('selenium-webdriver')
const assert = require('assert')

describe('LoginPage Tests', function () {
  let driver

  beforeAll(async function () {
    driver = await new Builder().forBrowser('chrome').build()
  })

  it('Should load the login page and check for elements', async function () {
    await driver.get('http://localhost:3000/login')
    const loginForm = await driver.findElement(By.tagName('form'))
    assert(loginForm, 'LoginForm is not present')
    const emailInput = await driver.findElement(By.name('email'))
    const passwordInput = await driver.findElement(By.name('password'))
    assert(emailInput && passwordInput, 'Email or Password fields are missing')
    const loginButton = await driver.findElement(By.tagName('button'))
    assert(loginButton, 'Login button is not present')
  })

  it('Should be able to submit the form', async function () {
    await driver.findElement(By.name('email')).sendKeys('bob@bob.com')
    await driver.findElement(By.name('password')).sendKeys('123', Key.RETURN)
    await driver.sleep(3000)
    const currentUrl = await driver.getCurrentUrl()
    const expectedUrl = 'http://localhost:3000/UserDashboard'
    expect(currentUrl).toBe(expectedUrl)
  })

  afterAll(() => driver && driver.quit())
})
