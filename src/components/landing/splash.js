import { useNavigate } from 'react-router-dom';

export default function Splash(){
    return (
        <div style={styles.div}>
            <Title />
            <SplashParagraph />
            <SignUpButton name="Sign Up Now!"/>
        </div>
    )
}

function Title(){
    return (
        <h1 style={styles.title}>Welome to "Name of App"</h1>
    )
}

function SplashParagraph(){
    return (
        <p style={styles.paragraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
    )
}

function SignUpButton({name}){
    const navigate = useNavigate();
	const handleClick = () => {
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
    div: {
        "height": "750px",
        "backgroundColor": "#ABABAB"
    },
    title:{
        "textAlign": "center",
        "fontSize": "64px",
        "fontWeight": "bold",
        "marginTop": "10%"
    },
    paragraph: {
        "fontSize": "36px",
        "margin": "auto",
        "width": "1040px",
    },  
    button: {
        backgroundColor: "#797979",
        color: "white",
        fontSize: "24px",
        cursor: "pointer",
        marginRight: "auto",
        width: "273px",
        height: "62px",
        borderRadius: "10px",
        marginTop: "60px",
        border: "none"
      },

}