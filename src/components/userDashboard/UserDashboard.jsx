import WaterInputModal from './waterInput/waterInput.js'
//import MealInputModal from '../components/userDashboard/mealInput'
import MealTracker from './mealTable/mealTable.js'

function UserDashboard() {
  return (
    <div>
      <div>
        <h1>ACTIVITY LOGGER</h1>
      </div>
        <MealTracker />
        <WaterInputModal />
    </div>
  )
}

export default UserDashboard;

