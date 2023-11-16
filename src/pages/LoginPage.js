import Navbar from '../components/Navbar.jsx'
import LoginForm from "../components/login/loginForm"
import ForgotPassword from "../components/login/forgotPassword"
import Logo from "../components/Logo"
import './styles.css'

function LoginPage() {
  return (
	<div style={styles.container}>
		<Navbar page="login"/>
		<div style={styles.formContainer}>
			<Logo size="200"/>
			<LoginForm />
		</div>
		<ForgotPassword />
	</div>
  )
}

const styles = {
  	container: {
		textAlign: 'center',
		backgroundColor: "#3F4D67",
		height: "100%",
		overflow: "hidden",
  	},
	formContainer: {
		marginTop: "5%",
		backgroundColor: "#3F4D67"
	}
}

export default LoginPage
