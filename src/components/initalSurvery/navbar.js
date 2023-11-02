// import Logo from '../Logo'
export default function Navbar() {
  return (
	<div style={styles.navbar}>
        {/* <Logo size="50" style={styles.logo}/> */}
        <h3 style={styles.title}>SET UP PROFILE</h3>
	</div>
  )
}

const styles = {
  navbar: {
		backgroundColor: '#ABABAB',
		padding: '10px',
  	},
	logo: {
		position: "relative",
		top: "10px",
		float: "left",
		left: "20px"
	},
  title: {
    fontSize: "25px",
    textAlign: "left",
    marginLeft: "150px" 
  }
}
