import Navbar from '../Navbar.jsx'
import SurveyForm from './surveryForm'

function SurveyPage() {
  return (
    <div style={styles.container}>
      <Navbar page='survey' />
      <SurveyForm />
    </div>
  )
}

const styles = {
  container: {
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
    height: '100%',
  },
}

export default SurveyPage
