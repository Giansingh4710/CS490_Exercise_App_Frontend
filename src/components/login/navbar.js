import RedirectButton from "../RedirectButton";
import Logo from "../Logo";

export default function Navbar() {
	let additionalStyles = {
		width: "166px",
		height: "61px",
		float: "right",
		marginRight: "30px",
		position: "relative",
		top: "10px",
	}
  	return (
		<div style={styles.navbar}>
			<div style={styles.logo}>
				<Logo size="50"/>
			</div>
			<RedirectButton name="Register" redirect="Register" additionalStyles={additionalStyles}/>
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
}
