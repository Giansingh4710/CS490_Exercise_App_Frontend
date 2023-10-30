import LoginModal from "../components/landingPage/loginModal"

document.body.style = 'background: #3f70f0;';

const BASE_BACKEND_URL = 'http://127.0.0.1:1313'
function LandingPage() {
  return (
    <div style={styles.container}>
      <LoginModal />
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
