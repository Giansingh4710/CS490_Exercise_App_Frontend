import InputElement from "../AccountInputElement";

export default function LoginForm(){
    return (
        <div style={styles.div}>
            <form style={styles.form}>
                <InputElement type="email" name="email" placeholder="Enter Email" label="Enter Email"/>
                <InputElement type="password" name="password" placeholder="Enter Password" label="Enter Password"/>
            </form>
            <Button name={"Login"}/>
        </div>
    )
}

function Button({name}){
    const hover = (e) => {
        e.target.style.background = 'white';
        e.target.style.color = "#3F4D67";

    }
    const unHover = (e) => {
        e.target.style.background = '#FFFFFF';
        e.target.style.color = "3F4D67";
    }

	return (
		<button style={styles.button} onMouseEnter={hover} onMouseLeave={unHover}>{name}</button>
	)
}

const styles = {
    div: {
        margin: "auto",
        width: "fit-content",
        backgroundColor: "#3F4D67"
    },
    form: {
        display: "grid",
        "grid-template-columns" : "400px",
        "grid-gap": "50px 50px",
    },
    button: {
        backgroundColor: "#FFFFFF",
        color: "#3F4D67",
        fontSize: "24px",
        cursor: "pointer",
        width: "166px",
        height: "61px",
        borderRadius: "10px",
        margin: "auto",
        marginTop: "50px",
        border: "none",
        fontWeight: "bold"
      },
}