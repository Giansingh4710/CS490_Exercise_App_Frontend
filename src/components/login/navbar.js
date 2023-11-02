import { Navigate } from "react-router-dom";

export default function Navbar() {
  	return (
		<div style={styles.navbar}>
			<Login name="Register"/>
		</div>
  )
}
function Login({name}){
	let clicked = false;
	function redirect(){
		clicked = true;
	}
	const hover = (e) => {
        e.target.style.background = 'white';
        e.target.style.color = "#797979";

    }
    const unHover = (e) => {
        e.target.style.background = '#797979';
        e.target.style.color = "white";
    }
	return (
		<div>
			{clicked && (<Navigate to="\login" /> )}
			<button style={styles.button} onclick={redirect} onMouseEnter={hover} onMouseLeave={unHover}>{name}</button>
		</div>
	)

}

const styles = {
  navbar: {
	backgroundColor: '#ABABAB',
	padding: '10px',
  },
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
	top: "10px",
	border: "none"
  },
}
