import Navbar from '../Navbar.jsx'
import ProfileForm from './ProfileForm'

function ProfilePage() {
  return (
    <div style={styles.container}>
      <Navbar page='survey' />
      <ProfileForm />
    </div>
  )
}

const styles = {
  container: {
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
    height: '100%',
  },
}

export default ProfilePage
