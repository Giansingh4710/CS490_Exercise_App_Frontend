import LoginModal from "../components/landingPage/loginModal"

const BASE_BACKEND_URL = 'http://127.0.0.1:1313'
function RegistrationPage() {
  return (
    <div style={styles.container}>
      <RegistrationModal />

    </div>
  )
}

const styles = {
  container: {
    textAlign: 'center',
  },
}

export default RegistrationPage
