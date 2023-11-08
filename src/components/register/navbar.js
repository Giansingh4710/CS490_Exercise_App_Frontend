import Button from '../LandingPageButton';
import Logo from '../Logo'
import { Link } from 'react-router-dom';

export default function Navbar() {
	let additionalStyles = {
		width: "166px",
		height: "61px",
		float: "right",
		marginRight: "10px",
		position: "relative",
	}
	return (
		<div style={styles.navbar}>
			<div style={styles.logo}>
				<Logo size="50"/>
			</div>
			<div style={styles.spacer}></div>
			<Link to="/Login"><Button name="LOGIN" additionalStyles={additionalStyles}/></Link>
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
