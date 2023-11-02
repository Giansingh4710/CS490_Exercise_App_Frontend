import Navbar from "../components/login/navbar"
import LoginForm from "../components/login/loginForm"
import ForgotPassword from "../components/login/forgotPassword"
import Logo from "../components/Logo"
import '../components/styles.css'

function LoginPage() {
  return (
	<div style={styles.container}>
		<Navbar />
		<div style={styles.formContainer}>
			<Logo />
			<LoginForm />
		</div>
		<ForgotPassword />
	</div>
  )
}

const styles = {
  	container: {
		textAlign: 'center',
		backgroundColor: "#ABABAB",
		height: "100%",
		overflow: "hidden",
  	},
	formContainer: {
		marginTop: "5%",	
	}
}

export default LoginPage