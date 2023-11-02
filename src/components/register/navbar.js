import RedirectButton from '../RedirectButton';
import Logo from '../Logo'

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
			<RedirectButton name="Login" redirect="Login" additionalStyles={additionalStyles}/>
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
