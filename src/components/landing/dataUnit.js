import Button from '../LandingPageButton';
import { Link } from 'react-router-dom';

export default function DataUnit(){
    let additionalStyles = {
        width: "166px",
        height: "61px",
        marginTop: "80px"
    }
    return (
        <>
            <div style={styles.div}>
                <Title text="REACH YOUR GOALS WHETHER YOU ARE A COACH OR CLIENT"/>
                <div style={styles.infoButtonContainer}>
                    <InfoLabel name="COACHES"/>
                    <InfoLabel name="CLIENTS"/>
                    <InfoLabel name="FEATURES"/>
                    <InfoLabel name="STATISTICS"/>
                </div>
                <SectionCard />
                <CardImage />
            </div>
            <div style={styles.div1}>
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

function SectionCard(){
    return (
        <div style={styles.sectionCardContainer}>
            <h1 style={styles.sectionTitle}>SECTION NAME</h1>
            <div style={styles.sectionCard}>
                <div style={styles.sectionContentContainer}>
                    <p style={styles.sectionHeader}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor  consecr adipiscing elit, sed do eiusmod tempor</p>
                    <ul style={styles.ul}>
                        <li style={styles.sectionPoints}>Lorem ipsum dolor sit</li>
                        <li style={styles.sectionPoints}>Lorem ipsum dolor sit</li>
                        <li style={styles.sectionPoints}>Lorem ipsum dolor sit</li>
                    </ul>
                </div>
            </div>
        </div>
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
function InfoLabel({name}){
    return (
        <>
            <button style={styles.infoLabel}>{name}</button>
        </>
    )
}

const styles = {
    div: {
        "backgroundColor": "#FFFFFF",
        "height": "975px",
        "minHeight": "975px",
        "overflowX": "hidden"
    },
    div1: {
        "backgroundColor": "#ABABAB",
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
        "padding": "15px",
        "borderRadius": "10px",
        "backgroundColor": "#797979",
        "width": "300px",
        "fontSize": "32px",
        margin: "auto"
    },
    image: {
        marginTop: "5%",
        marginBottom: "3%"
    },
    card: {
        "margin": "auto",
        "width": "350px",
        "position": "relative",
    },
    cardContainer: {
        "display": "grid",
        "grid-template-columns" : "1fr 1fr 1fr",
        "position": "relative",
        top: "5%"
    },
    cardText: {
        "margin": "auto",
        "color": "white",
        "fontSize": "36px",
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
    sectionCard: {
        backgroundColor: "#797979",
        width: "fit-content",
        height: "585px",
        borderRadius: "10px",

    },
    sectionHeader: {
        fontSize: "30pt",
        textAlign: "left",
        margin: "auto",
        paddingLeft: "50px",
        paddingRight: "50px",
        width: "443px",
        color: "#FFFFFF"

    },
    sectionPoints: {
        fontSize: "28pt",
        textAlign: "left",
        listStylePosition: "inside",
        color: "#FFFFFF"

    },
    sectionContentContainer: {
        width: "fit-content",
        height: "fit-content",
        margin: "0",
        position: "relative",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },
    ul: {

    },
    sectionCardContainer: {
        position: "absolute",
        left: "45px",
    },
    sectionTitle: {
        fontSize: "38pt",
        textAlign: "left"
    }


}