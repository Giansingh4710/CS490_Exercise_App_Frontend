import Navbar from '../Navbar.jsx'
import LoginForm from './loginForm'
import Logo from '../Logo'
import '../styles.css'

function LoginPage() {
  return (
    <div style={styles.container}>
      <Navbar page='login' />
      <div style={styles.formContainer}>
        <Logo size='200' />
        <LoginForm />
      </div>
      <button
        style={{
          overflow: 'hidden',
          color: '#A9B7D0',
          fontStyle: 'italic',
        }}>
        Forgot Password?
      </button>
    </div>
  )
}

const styles = {
  container: {
    textAlign: 'center',
    backgroundColor: '#3F4D67',
    height: '100%',
    overflow: 'hidden',
  },
  formContainer: {
    marginTop: '5%',
    backgroundColor: '#3F4D67',
  },
}

export default LoginPage
