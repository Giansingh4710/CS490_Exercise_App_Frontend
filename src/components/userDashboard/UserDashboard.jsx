import WaterInputModal from './waterInput'
import MealInputModal from './mealInput'
import Logo from '../Logo'

function UserDashboard() {
  return (
    <div style={styles.container}>
      <div style={styles.logoContainer}>
        <Logo size={100}/>
      </div>
      <WaterInputModal />
      <MealInputModal />
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
export default UserDashboard
