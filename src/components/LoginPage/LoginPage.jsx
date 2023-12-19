import Navbar from '../Navbar.jsx'
import LoginForm from './loginForm'
import Logo from '../Logo'

function LoginPage() {
  return (
    <div style={styles.container}>
      <Navbar page='login' />
      <div style={styles.formContainer}>
        <Logo size='200' />
        <LoginForm />
      </div>
      <button
        className='forgot-password-btn'
        style={{
          overflow: 'hidden',
          color: '#A9B7D0',
          fontStyle: 'italic',
          background: 'transparent',
          border: 'none',
          padding: '20px',
          cursor: 'pointer',
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
    height: '975px',
    overflow: 'hidden',
  },
  formContainer: {
    marginTop: '5%',
    backgroundColor: '#3F4D67',
  },
}

export default LoginPage
