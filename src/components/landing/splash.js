import { Link } from "react-router-dom";
import Button from "../LandingPageButton";

export default function Splash(){
    return (
        <div style={styles.div}>
            <Title />
            <SplashParagraph />
            <Link to="/Register"><Button name="Sign Up Now!" additionalStyles={styles.button}/></Link>
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

const styles = {
    div: {
        "height": "750px",
        "backgroundColor": "#ABABAB"
    },
    title:{
        "textAlign": "center",
        "fontSize": "64px",
        "fontWeight": "bold",
        "marginTop": "10%",
        color: "white"
    },
    paragraph: {
        "fontSize": "36px",
        "margin": "auto",
        "width": "1040px",
        color: "white"
    },  
    button: {
        backgroundColor: "#D9D9D9",
        color: "#00000",
        cursor: "pointer",
        marginRight: "auto",
        width: "273px",
        height: "62px",

        marginTop: "60px",

      },

}