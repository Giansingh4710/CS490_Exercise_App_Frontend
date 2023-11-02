import Navbar from "../components/register/navbar"
import RegistrationForm from "../components/register/registrationForm"
import Logo from "../components/Logo"
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
        height: "975px"
    },
    logoContainer: {
        margin: "auto",
        paddingTop: "10%",
    }
}
export default RegistrationPage