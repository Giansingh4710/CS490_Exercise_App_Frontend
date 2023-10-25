import Navbar from "../components/navbar"

const BASE_BACKEND_URL = 'http://127.0.0.1:1313'
function LandingPage() {
  return (
    <div style={styles.container}>
      <Navbar />
      <header style={styles.header}>
        <p>Landing Page</p>
      </header>
      <div>Do Stuff Here</div>
      <button onClick={()=>{
        fetch(`${BASE_BACKEND_URL}/health-check`)
        .then(res => res.text())
        .then(data => alert(data))
        .catch(err => alert(err))
      }}>Health Check</button>
    </div>
  )
}

const styles = {
  container: {
    textAlign: 'center',
  },
}

export default LandingPage
