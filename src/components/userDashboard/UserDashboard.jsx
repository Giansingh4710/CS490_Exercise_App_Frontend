import WaterInputModal from './waterInput/waterInput.js'
import MealTracker from '../userDashboard/mealTable/mealTable.js'
import { useState } from 'react'
import MealInput from './mealInput/mealInput.js'
import './UserDashboard.css'

function UserDashboard() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  return (
    <>
      {modalIsOpen && <MealInput setModalIsOpen={setModalIsOpen} />}
      <div className={modalIsOpen ? 'user-dashboard blurred' : 'user-dashboard'}>
        <div>
          <h1>ACTIVITY LOGGER</h1>
        </div>
        <MealTracker isMealInputModalOpen={modalIsOpen} setMealInputModalOpen={setModalIsOpen} />
        <WaterInputModal />
      </div>
    </>
  )
}

export default UserDashboard
