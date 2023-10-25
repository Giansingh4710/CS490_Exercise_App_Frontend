import Navbar from "../components/navbar"

function OtherRandomPage() {
  return (
    <div style={styles.container}>
      <Navbar />
      <header style={styles.header}>
        <p>Other Page</p>
      </header>
      <div>Ugly styling IK</div>
    </div>
  )
}

const styles = {
  container: {
    textAlign: 'center',
  },
  header: {
    backgroundColor: '#282c34',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
  },
}

export default OtherRandomPage
