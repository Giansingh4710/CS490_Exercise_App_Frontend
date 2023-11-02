import RedirectButton from '../RedirectButton';
import Logo from "../Logo";

export default function Navbar() {
	let buttonSizeStyle = {
		"width": "166px",
        "height": "61px",
		"marginRight": "30px"
	}
	return (
		<div style={styles.navbar}>
			<div style={styles.logo}>
				<Logo size="50"/>
			</div>
			<div style={styles.navbarButtonsContainer}>
				<RedirectButton name="Login" redirect="Login" additionalStyles={buttonSizeStyle}/>
				<RedirectButton name="Register" redirect="Register" additionalStyles={buttonSizeStyle}/>
			</div>
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
	navbarButtonsContainer: {
		float: "right",
		position: "relative",
		top: "10px",
	}
}
