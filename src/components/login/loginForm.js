import InputElement from "../InputElement";
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
        e.target.style.color = "#797979";

    }
    const unHover = (e) => {
        e.target.style.background = '#797979';
        e.target.style.color = "white";
    }

	return (
		<button style={styles.button} onMouseEnter={hover} onMouseLeave={unHover}>{name}</button>
	)
}

const styles = {
    div: {
        margin: "auto",
        width: "fit-content",
    },
    form: {
        display: "grid",
        "grid-template-columns" : "400px",
        "grid-gap": "50px 50px",
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
        marginTop: "50px",
        border: "none"
      },
}