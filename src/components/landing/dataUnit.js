import Button from '../LandingPageButton';
import { Link } from 'react-router-dom';

export default function DataUnit(){
    let additionalStyles = {
        width: "273px",
        height: "62px",
        marginTop: "80px",
        // fontSize: "28pt",
    }
    return (
        <>
            <div style={styles.div}>
                <Title text="SEE WHAT [INSERT COMPANY NAME] CAN DO FOR YOU"/>
                <div style={styles.cardContainer}>
                    <InfoCard title="LOREM IPSUM" text="Lorem ipsum dolor sit amet, consect adipiscing elit, sed do eiusmod tempor  consecr adipiscing elit, sed do eiusmod tempor"/>
                    <InfoCard title="LOREM IPSUM" text="Lorem ipsum dolor sit amet, consect adipiscing elit, sed do eiusmod tempor  consecr adipiscing elit, sed do eiusmod tempor"/>
                    <InfoCard title="LOREM IPSUM" text="Lorem ipsum dolor sit amet, consect adipiscing elit, sed do eiusmod tempor  consecr adipiscing elit, sed do eiusmod tempor"/>
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
            <CardTitle title={title}/>
            <CardImage />
            <CardText info={text}/>
        </div>
    )
}
function CardTitle({title}){
    return(
        <h4 style={styles.cardTitle}>{title}</h4>
    )
}
function CardImage(img){
    return (
        <img src={'./images/img_default.png'} alt="this is a something" style={styles.image}/>
    )
}
function CardText(info){
    return (
        <p style={styles.cardText}>Lorem ipsum dolor sit amet, consect adipiscing elit, sed do eiusmod tempor  consecr adipiscing elit, sed do eiusmod tempor</p>
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
        position: "relative",
    },
    cardContainer: {
        display: "grid",
        gridTemplateColumns : "1fr 1fr 1fr",
        position: "relative",
        top: "5%"
    },
    cardText: {
        margin: "auto",
        color: "#FFFFFF",
        fontSize: "36px",
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