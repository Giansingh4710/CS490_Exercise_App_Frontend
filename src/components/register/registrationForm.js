import InputElement from "../AccountInputElement"
import Button from "../LandingPageButton";

export default function RegistrationForm(){
    let additionalStyles = {
        width: "400px"
    }
    return (
        <div style={styles.div}>
            <form style={styles.form}>
                <InputElement type="email" name="EMAIL" placeholder="youremail@example.com" label="EMAIL" additionalStyles={additionalStyles}/>
                <InputElement type="password" name="PASSWORD" placeholder="Password" label="PASSWORD" additionalStyles={additionalStyles}/>
                <InputElement type="password" name="CONFIRM-PASSWORD" placeholder="Confirm Password" label="CONFIRM PASSWORD" />
            </form>
            <Button name="Create Account" additionalStyles={styles.button}/>
        </div>
    )
}

const styles = {
    div: {
        margin: "auto",
        backgroundColor: "#3F4D67",
        width: "fit-content",
        position: "relative",
    },
    form: {
        display: "relative",
        textAlign: "center",
        backgroundColor: "#00000",
    },
    button: {
        backgroundColor: "#FFFFFF",
        color: "#3F4D67",
        fontSize: "24px",
        cursor: "pointer",
        width: "250px",
        height: "61px",
        borderRadius: "10px",
        margin: "auto",
        marginTop: "50px"
    },
}