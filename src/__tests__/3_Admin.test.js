const { Builder, By, Key } = require('selenium-webdriver')
const assert = require('assert')
import BASE_URLS from '../constants'
const baseURL = BASE_URLS.UI_BASE_URL
import { loginAsAdmin, logout, selectDropdownOption } from './helperFunctions'

// Automated UI testing to test Admin features:
//  Admin can add or delete (deactivate) exercises from the master exercise bank (1)
//  Admin can approve or reject Coach Requests (1)
describe('Admin Tests', function () {
  let driver
  beforeAll(async function () {
    driver = await new Builder().forBrowser('chrome').build()
  })
  afterAll(() => driver && driver.quit())

  loginAsAdmin()

  it('Admin should accept a pending coach request'),
    async function () {
      const pendingCoachesBefore = await driver.findElements(By.css('.coach-card'))
      let pendingCoachesListLengthBefore = pendingCoachesBefore.length
      await driver.get(baseURL + '/ManageCoaches')
      if (pendingCoaches.length > 0) {
        await pendingCoaches[pendingCoaches.length - 1].click() // Clicks the last coach in the list (newest coach)
        await driver.findElement(By.css('.accept-button')).click()
      }
      await driver.sleep(4000)

      const pendingCoachesAfter = await driver.findElements(By.css('.coach-card'))
      let pendingCoachesListLengthAfter = pendingCoachesAfter.length

      assert(pendingCoachesListLengthAfter != pendingCoachesListLengthBefore)
    }

  it('Admin should create an exercise'),
    async function () {
      await driver.get(baseURL + '/ManageExercises')

      const createButton = await driver.findElement(By.css('.add-exercise-button'))
      const exerciseListBefore = await driver.findElement(By.css('.exercise-card'))
      const exerciseListLengthBefore = exerciseListBefore.length
      await createButton.click()
      await driver.sleep(2000)
      await driver.findElement(By.name('exerciseName')).sendKeys('Test Exercise')
      await driver.findElement(By.name('exerciseDescription')).sendKeys('Test exercise Description')
      await selectDropdownOption(driver, 'exerciseMuscleGroup', 'Chest')
      await selectDropdownOption(driver, 'exerciseEquipment', 'Barbell')

      const saveButton = await driver.findElement(By.css('.save-exercise-button'))
      await saveButton.click()

      await driver.sleep(4000)

      const exerciseListAfter = await driver.findElement(By.css('.exercise-card'))
      const exerciseListLengthAfter = exerciseListAfter.length
      assert(exerciseListLengthBefore != exerciseListLengthAfter)
    }

  it('Admin should disable an exercise', async function () {
    await driver.get(baseURL + '/ManageExercises')
    const exercises = await driver.findElement(By.css('.add-exercise-button'))
    if (exercises.length > 0) {
      await exercises[0].click()
      const checkbox = await driver.findElement(By.name('enabled-or-disabled'))
      const isCheckedBefore = await checkbox.isSelected()
      await checkbox.click()
      await driver.sleep(4000)

      const isCheckedAfter = await checkbox.isSelected()
      assert(isCheckedBefore != isCheckedAfter)
    }
  })
  logout()
})
