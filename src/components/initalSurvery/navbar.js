// import Logo from '../Logo';

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
		padding: '5px',
  	},
	logo: {
		position: "relative",
		top: "10px",
		float: "left",
		left: "20px"
	},
	title: {
		fontSize: "25pt",
		textAlign: "left",
		marginLeft: "150px",
		color: "#FFFFFF",
  }
}
