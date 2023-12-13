import Navbar from "../Navbar.jsx";
import RegistrationForm from "./registerForm";
import Logo from "../Logo";

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
    height: "975px",
  },
  formContainer: {
    marginTop: "5%"
  },
};
export default RegistrationPage;
