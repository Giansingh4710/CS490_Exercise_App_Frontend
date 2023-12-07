import WaterInputModal from './waterInput/waterInput.js'
import MealTracker from '../userDashboard/mealTable/mealTable.js'
import { useState } from 'react'
import MealInput from './mealInput/mealInput.js'
import './UserDashboard.css'
import { BlueSubmitButton } from '../Buttons/Buttons.jsx'
function UserDashboard() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  return (
    <>
      {modalIsOpen && <MealInput setModalIsOpen={setModalIsOpen} />}
      <div className={modalIsOpen ? 'user-dashboard blurred' : 'user-dashboard'}>
        <h1>ACTIVITY LOGGER</h1>
        <div className='user-dashboard-columns'>
          <div className='user-dashboard-column meal-tracker'>
            <MealTracker
              isMealInputModalOpen={modalIsOpen}
              setMealInputModalOpen={setModalIsOpen}
            />
          </div>

          <div className='user-dashboard-column'>
            <WaterInputModal />
          </div>
        </div>
        <div className='user-dashboard-btn'>
          <BlueSubmitButton />
        </div>
      </div>
    </>
  )
}

export default UserDashboard
