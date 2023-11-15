import Button from '../LandingPageButton';
import { Link } from 'react-router-dom';

export default function DataUnit(){
    let additionalStyles = {
        width: "273px",
        height: "62px",
        marginTop: "200px",
    }
    return (
        <>
            <div style={styles.div}>
                <Title text="SEE WHAT FITFUSION CAN DO FOR YOU"/>
                <div style={styles.cardContainer}>
                    <InfoCard title="CONNECT" text="In FitFusion, discover a world of expert coaches. Get tailored guidance at your fingertips, making personal connections that helps transform goals into reality."/>
                    <InfoCard title="TRACK" text="With FitFusion, every activity and calorie counts. Precision tracking meets intuitive design, empowering you with insights for a healthier lifestyle."/>
                    <InfoCard title="ACHIEVE" text="Achieve holistic well-being with FitFusion. Embrace mood tracking for emotional balance, helping you paving the way to a happier and more fulfilled you."/>
                </div>
                <Link to="/Register"><Button name="Sign Up!" additionalStyles={additionalStyles}/></Link>
            </div>
        </>
    )
}

function Title({text}){
    return (
        <h1 style={styles.title}>{text}</h1>
    )
}

function InfoCard({title, text}){
    return (
        <div style={styles.card}>
            <h4 style={styles.cardTitle}>{title}</h4>
            <img src={'./images/img_default.png'} alt="this is a something" style={styles.image}/>
            <p style={styles.cardText}>{text}</p>
        </div>
    )
}

const styles = {
    div: {
        "backgroundColor": "#A9B7D0",
        "height": "975px",
        "minHeight": "975px",
        "overflowX": "hidden"
    },
    title: {
        "textAlign": "center",
        "position": "relative",
        "top": "30px",
        "fontSize": "40px",
    },
    paragraph: {
        "fontSize": "36px",
        "position": "relative",
        "margin": "auto",
        "width": "443px",
        // "top": "30px",
        color: "white",
    },
    cardTitle: {
        padding: "15px",
        borderRadius: "10px",
        backgroundColor: "#3F4D67",
        width: "300px",
        fontSize: "32px",
        margin: "auto",
        color: "#FFFFFF"
    },
    image: {
        marginTop: "5%",
        marginBottom: "3%"
    },
    card: {
        margin: "auto",
        width: "350px",
    },
    cardContainer: {
        display: "grid",
        gridTemplateColumns : "1fr 1fr 1fr",
        position: "relative",
        top: "5%",
    },
    cardText: {
        margin: "auto",
        color: "#FFFFFF",
        fontSize: "30px",
    },
    infoLabel: {
        fontSize: "24px",
        fontWeight: "bold",
        width: "195px",
        height: "61px",
        marginLeft: "75px",
        marginRight: "75px",
        borderRadius: "10px",
        border: "none",
    },
    infoButtonContainer: {
        position: "relative",
        marginTop: "50px",
    },
    ul: {

    }

}