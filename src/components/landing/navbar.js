import Button from '../LandingPageButton';
import Logo from "../Logo";
import { Link } from 'react-router-dom';

export default function Navbar() {
	let buttonSizeStyle = {
		"width": "166px",
        "height": "61px",
		"marginRight": "10px"
	}
	return (
		<div style={styles.navbar}>
			<div style={styles.logo}>
				<Logo size="50"/>
			</div>
			<div style={styles.spacer}></div>
			<div style={styles.navbarButtonsContainer}>
				<Link to="/Login"><Button name="LOGIN" additionalStyles={buttonSizeStyle}/></Link>
				<Link to="/Register"><Button name="REGISTER" additionalStyles={buttonSizeStyle}/></Link>
			</div>
		</div>
  )
}

const styles = {
  	navbar: {
		backgroundColor: '#ABABAB',
		padding: '10px',
		display: "flex",
		alignItems: "center",
  	},
	spacer: {
		flexGrow: "1",
	}
}
