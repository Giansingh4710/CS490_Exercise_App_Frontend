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
        <h1 style={styles.title}>Welome to FitFusion</h1>
    )
}

function SplashParagraph(){
    return (
        <p style={styles.paragraph}>Discover a healthier, happier you with FitFusion. This is where expert coaching, activity tracking, and mood management converge. Tailored insights and personal guidance at your fingertips, fostering your journey towards well-being. Your goals, our mission. Start transforming today!</p>
    )
}

const styles = {
    div: {
        "height": "750px",
        "backgroundColor": "#3F4D67"
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