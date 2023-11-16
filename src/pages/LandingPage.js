import Navbar from '../components/Navbar.jsx'
import Splash from "../components/landing/splash"
import DataUnit from "../components/landing/dataUnit"
import './styles.css'

// const BASE_BACKEND_URL = 'http://127.0.0.1:1313'
function LandingPage() {
  return (
    <div style={styles.container}>
        <Navbar page="landing" />
        <Splash />
        <DataUnit />
      {/* <button onClick={()=>{
        fetch(`${BASE_BACKEND_URL}/health-check`)
        .then(res => res.text())
        .then(data => alert(data))
        .catch(err => alert(err))
      }}>Health Check</button> */}
    </div>
  )
}

const styles = {
  container: {
    textAlign: 'center',
    backgroundColor: "#3F4D67",
    overflow: "hidden"
  },
}

export default LandingPage
