import Logo from '../Logo';

export default function Navbar() {
  return (
	<div style={styles.navbar}>
		<div style={styles.container}>
			<div style={styles.logo}>
				<Logo size="50" />
			</div>
			<h3 style={styles.title}>SET UP PROFILE</h3>
		</div>
	</div>
  )
}

const styles = {
	navbar: {
		backgroundColor: '#3F4D67',
		padding: '5px',
	},
	logo: {
		width: "fit-content",
		height: "fit-content",
		marginTop: "18px"
	},
	title: {
		height: "fit-content",
		width: "fit-content",
		color: "#FFFFFF",
		fontSize: "20pt",
		padding: "0px"
	},
	container: {
		display: "grid",
		gridTemplateColumns: "100px 500px"
	}
}
