import InputElement from "../AccountInputElement"
import Button from "../LandingPageButton";

export default function RegistrationForm(){
    return (
        <div style={styles.div}>
            <form style={styles.form}>
                <InputElement type="email" name="EMAIL" placeholder="Email" label="Enter Email"/>
                <InputElement type="name" name="NAME" placeholder="Name" label="Enter Name"/>
                <InputElement type="password" name="PASSWORD" placeholder="Password" label="Enter Password"/>
                <InputElement type="password" name="REPASSWORD" placeholder="Re-Enter Password" label="Re-Enter Password"/>
            </form>
            <Button name={"Sign Up"} additionalStyles={styles.button}/>
        </div>
    )
}

const styles = {
    div: {
        margin: "auto",
        backgroundColor: "#ABABAB",
        width: "fit-content",
        position: "relative",
    },
    form: {
        display: "grid",
        "grid-template-columns" : "400px 400px",
        "grid-gap": "50px 50px",
        textAlign: "center",
        backgroundColor: "#00000",
    },
    button: {
        backgroundColor: "#797979",
        color: "white",
        fontSize: "24px",
        cursor: "pointer",
        width: "166px",
        height: "61px",
        borderRadius: "10px",
        margin: "auto",
        marginTop: "50px"
    },
}