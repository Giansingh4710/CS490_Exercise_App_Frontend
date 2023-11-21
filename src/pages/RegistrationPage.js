import Navbar from "../components/Navbar.jsx";
import RegistrationForm from "../components/register/registrationForm";
import Logo from "../components/Logo";
import "./styles.css";

function RegistrationPage() {
  return (
    <div style={styles.container}>
      <Navbar page="register" />
      <div style={styles.formContainer}>
        <Logo size="200" />
        <RegistrationForm />
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    backgroundColor: "#3F4D67",
    height: "100%",
  },
  formContainer: {
    // marginTop: "5%"
  },
};
export default RegistrationPage;
