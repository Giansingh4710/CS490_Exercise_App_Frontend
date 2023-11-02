import Navbar from "../components/login/navbar"
import LoginForm from "../components/login/loginForm"
import ForgotPassword from "../components/login/forgotPassword"
import Logo from "../components/Logo"

// const BASE_BACKEND_URL = 'http://127.0.0.1:1313'
function LoginPage() {
  return (
	<div style={styles.container}>
		<Navbar />
		<div style={styles.logoContainer}>
			<Logo />
		</div>
		<LoginForm />
		<ForgotPassword />
	</div>
  )
}

const styles = {
  	container: {
		textAlign: 'center',
		backgroundColor: "#ABABAB",
		height: "975px",
  	},
  	logoContainer: {
		margin: "auto",
		width: "fit-content",
		paddingTop: "10%",
  	}
}

export default LoginPage