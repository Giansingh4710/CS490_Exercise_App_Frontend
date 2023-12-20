// const { Builder, By, Key } = require('selenium-webdriver')
// const assert = require('assert')
// import BASE_URLS from '../constants'
// const baseURL = BASE_URLS.UI_BASE_URL

// // Automated UI testing to test Admin features:
// //  Admin can add or delete (deactivate) exercises from the master exercise bank (1)
// //  Admin can approve or reject Coach Requests (1)
// describe('LoginPage Tests', function () {
//   let driver
//   console.log('BASEURL', baseURL)
//   beforeAll(async function () {
//     driver = await new Builder().forBrowser('chrome').build()
//   })
//   console.log('BASEURL:', baseURL)
//   it('Should load the login page and check for elements', async function () {
//     await driver.get(baseURL + '/login')
//     const loginForm = await driver.findElement(By.tagName('form'))
//     assert(loginForm, 'LoginForm is not present')
//     const emailInput = await driver.findElement(By.name('email'))
//     const passwordInput = await driver.findElement(By.name('password'))
//     assert(emailInput && passwordInput, 'Email or Password fields are missing')
//     const loginButton = await driver.findElement(By.tagName('button'))
//     assert(loginButton, 'Login button is not present')
//   })

//   it('Should be able to submit the form', async function () {
//     await driver.findElement(By.name('email')).sendKeys('bob@bob.com')
//     await driver.findElement(By.name('password')).sendKeys('123', Key.RETURN)
//     await driver.sleep(3000)
//     const currentUrl = await driver.getCurrentUrl()
//     const expectedUrl = baseURL + '/UserDashboard'
//     expect(currentUrl).toBe(expectedUrl)
//   })

//   // user is now logged in
//   // this is where we add the testing for the other 7 features

//   afterAll(() => driver && driver.quit())
// })
