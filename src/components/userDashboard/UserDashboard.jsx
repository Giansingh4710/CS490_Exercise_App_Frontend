import WaterInputModal from './waterInput.js'
//import MealInputModal from '../components/userDashboard/mealInput'
import MealTracker from './mealTable.js'

function UserDashboard() {
  return (
    <div style={styles.container}>
      <div style={styles.logoContainer}>
      </div>
        <MealTracker />
        <WaterInputModal />
    </div>
  )
}

const styles = {
  container: {
    textAlign: 'center',
    backgroundColor: '#ABABAB',
    height: '975px',
  },
  logoContainer: {
    margin: 'auto',
    width: 'fit-content',
    paddingTop: '10%',
  },
}
export default UserDashboard;

