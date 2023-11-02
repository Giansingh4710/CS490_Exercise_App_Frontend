import Navbar from "../components/register/navbar"
import RegistrationForm from "../components/register/registrationForm"
import Logo from "../components/Logo"
import '../components/styles.css'
function RegistrationPage() {
    return (
      <div style={styles.container}>
        <Navbar />
        <div style={styles.logoContainer}>
            <Logo />
        </div>
        <RegistrationForm />
      </div>
    )
  }
  
const styles = {
    container: {
        textAlign: 'center',
        backgroundColor: "#ABABAB",
        height: "100%",
    },
    logoContainer: {
        margin: "auto",
        paddingTop: "10%",
    }
}
export default RegistrationPage