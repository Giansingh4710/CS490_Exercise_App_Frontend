import RedirectButton from '../RedirectButton';

export default function DataUnit(){
    let additionalStyles = {
        width: "166px",
        height: "61px",
        marginTop: "50px"
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
                <SectionTitle text="SECTION NAME"/>
                <SectionCard />
            </div>
            <div style={styles.div1}>
                <Title text="SEE WHAT [INSERT COMPANY NAME] CAN DO FOR YOU"/>
                <div style={styles.cardContainer}>
                    <InfoCard title="LOREM IPSUM" text="Lorem ipsum dolor sit amet, consect adipiscing elit, sed do eiusmod tempor  consecr adipiscing elit, sed do eiusmod tempor"/>
                    <InfoCard title="LOREM IPSUM" text="Lorem ipsum dolor sit amet, consect adipiscing elit, sed do eiusmod tempor  consecr adipiscing elit, sed do eiusmod tempor"/>
                    <InfoCard title="LOREM IPSUM" text="Lorem ipsum dolor sit amet, consect adipiscing elit, sed do eiusmod tempor  consecr adipiscing elit, sed do eiusmod tempor"/>
                </div>
                <RedirectButton name="Sign Up!" redirect="Register" additionalStyles={additionalStyles}/>
            </div>
        </>
    )
}

function Title({text}){
    return (
        <h1 style={styles.title}>{text}</h1>
    )
}
function SectionTitle({text}){
    return (
        <h1 style={styles.sectionTitle}>{text}</h1>
    )
}
function SectionCard(){
    return (
        <div style={styles.sectionCard}>
            <p style={styles.paragraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor  consecr adipiscing elit, sed do eiusmod tempor</p>
            <li style={styles.listItem}>Lorem ipsum dolor sit</li>
            <li style={styles.listItem}>Lorem ipsum dolor sit</li>
            <li style={styles.listItem}>Lorem ipsum dolor sit</li>
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
    sectionTitle: {
        "textAlign": "left",
        "position": "relative",
        "top": "75px",
        "left": "45px",
        "fontSize": "40px",
    },
    sectionCard: {
        "position": "relative",
        "top": "8%",
        "left": "45px",
        "width": "543px",
        "height": "570px",
        "backgroundColor": "#797979",
        "borderRadius": "10px",
    },
    listItem: {
        fontSize: "32px",
        marginTop: "50px",
        marginLeft: "45px",
        float: "left",
        color: "white",
    },
    paragraph: {
        "fontSize": "36px",
        "position": "relative",
        "margin": "auto",
        "width": "443px",
        "top": "30px",
        color: "white",
    },
    cardTitle: {
        "padding": "15px",
        "borderRadius": "10px",
        "backgroundColor": "#797979",
        "width": "300px",
        "fontSize": "32px",
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
    },
    cardText: {
        "margin": "auto",
        "color": "white",
        "fontSize": "36px",
    },
    infoLabel: {
        fontSize: "24px",
        cursor: "pointer",
        width: "166px",
        height: "61px",
        marginLeft: "75px",
        marginRight: "75px",
        borderRadius: "10px",
        border: "none",
    },
    infoButtonContainer: {
        position: "relative",
        marginTop: "50px"
    },

}