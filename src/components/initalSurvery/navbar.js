export default function Navbar() {
  return (
	<div style={styles.navbar}>
        <h3 style={styles.title}>SET UP PROFILE</h3>
	</div>
  )
}

const styles = {
  navbar: {
	backgroundColor: '#ABABAB',
	padding: '10px',
  },
  title: {
    fontSize: "25px",
    textAlign: "left",
    marginLeft: "150px" 
  }
}
