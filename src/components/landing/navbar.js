import { useNavigate } from 'react-router-dom';
import Logo from "../Logo";

export default function Navbar() {
  return (
	<div style={styles.navbar}>
		<div style={styles.logo}>
			<Logo size="50"/>
		</div>
		<LoginRegisterButton name="Login"/>
		<LoginRegisterButton name="Register"/>
	</div>
  )
}
function LoginRegisterButton({name}){
	const navigate = useNavigate();
	const handleClick = () => {
		if(name === "Login")	
			navigate("/Login")
		else if (name === "Register")
			navigate("/Register")
	};

    const hover = (e) => {
        e.target.style.background = 'white';
        e.target.style.color = "#797979";

    }
    const unHover = (e) => {
        e.target.style.background = '#797979';
        e.target.style.color = "white";
    }

	return (
		<button style={styles.button} onClick={handleClick} onMouseEnter={hover} onMouseLeave={unHover}>{name}</button>
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
  logo: {
	position: "relative",
	top: "10px",
	float: "left"
	}
}
