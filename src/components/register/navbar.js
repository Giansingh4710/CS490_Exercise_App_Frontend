import '../styles.css'

export default function Navbar() {
	return (
		<Login name="Login"/>
  	)
}
function Login({name}){
	const hover = (e) => {
        e.target.style.background = 'white';
        e.target.style.color = "#797979";

    }
    const unHover = (e) => {
        e.target.style.background = '#797979';
        e.target.style.color = "white";
    }

	return (
		<button style={styles.button} onMouseEnter={hover} onMouseLeave={unHover}>{name}</button>
	)
}

const styles = {
  	button: {
		backgroundColor: "#797979",
		color: "white",
		fontSize: "24px",
		cursor: "pointer",
		marginRight: "30px",
		width: "166px",
		height: "61px",
		borderRadius: "10px",
		float: "right",
		position: "relative",
		top: "10px"
  	},
}
