import Navbar from "../components/register/navbar"
import RegistrationForm from "../components/register/registrationForm"
import Logo from "../components/Logo"
import '../components/styles.css'

function RegistrationPage() {
	return (
		<div style={styles.container}>
			<Navbar />
			<div style={styles.formContainer}>
				<Logo />
				<RegistrationForm />
			</div>
		</div>
	)
}
	
const styles = {
	container: {
		textAlign: 'center',
		backgroundColor: "#ABABAB",
		height: "100%",
	},
	formContainer: {
		marginTop: "5%"
	}
}
export default RegistrationPage