const { Builder, By, Key, until } = require('selenium-webdriver')
import BASE_URLS from '../../constants'
const baseURL = BASE_URLS.UI_BASE_URL

// client login function
async function loginAsClient(driver) {
  await driver.get(baseURL + '/login')
  await driver.findElement(By.name('email')).sendKeys('client@gmail.com')
  await driver.findElement(By.name('password')).sendKeys('12345678', Key.RETURN)
  await driver.sleep(4000)
  return await driver.getCurrentUrl()
}

// coach login function
async function loginAsCoach(driver) {
  await driver.get(baseURL + '/login')
  await driver.findElement(By.name('email')).sendKeys('coach@gmail.com')
  await driver.findElement(By.name('password')).sendKeys('12345678', Key.RETURN)
  await driver.sleep(4000)
  return await driver.getCurrentUrl()
}

// admin login function
async function loginAsAdmin(driver) {
  await driver.get(baseURL + '/login')
  await driver.findElement(By.name('email')).sendKeys('admin@fitfusion.com')
  await driver.findElement(By.name('password')).sendKeys('password99', Key.RETURN)
  await driver.sleep(4000)
  return await driver.getCurrentUrl()
}

// logout function
async function logout(driver) {
  const logoutButton = await driver.findElement(By.css('.sidebar-logout-btn'))
  await logoutButton.click()

  await driver.sleep(2000)
  return await driver.getCurrentUrl()
}
// delete account function
async function deleteAccount(driver) {
  const profile = await driver.findElement(By.css('.sidebar-profile-btn'))
  await profile.click()

  await driver.sleep(2000)
  return await driver.getCurrentUrl()
}

async function selectDropdownOption(driver, dropdownName, optionText) {
  const dropdown = await driver.findElement(By.name(dropdownName))
  await driver.wait(until.elementIsVisible(dropdown), 10000) // Wait for dropdown to be visible
  await dropdown.click() // Open dropdown

  const options = await dropdown.findElements(By.css('option'))
  for (let option of options) {
    const text = await option.getText()
    if (text === optionText) {
      await option.click() // Select the option
      break
    }
  }

  await dropdown.click() // Close dropdown (if necessary)
}

module.exports = {
  loginAsClient,
  loginAsCoach,
  loginAsAdmin,
  logout,
  selectDropdownOption,
}
