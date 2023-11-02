export default function RegistrationForm(){
    return (
        <div style={styles.div}>
            <form style={styles.form}>
                <InputElement type="email" name="EMAIL" placeholder="Email"/>
                <InputElement type="name" name="NAME" placeholder="Name"/>
                <InputElement type="password" name="PASSWORD" placeholder="Password"/>
                <InputElement type="password" name="PASSWORD" placeholder="Reenter Password"/>
            </form>
            <Button name={"Sign Up"}/>
        </div>
    )
}

function InputElement({type, name, placeholder}){
    return (
        <div style={styles.inputElement}>
            <p>ENTER {name}</p>
            <input type={type} name={name} placeholder={placeholder} style={styles.inputField}></input>
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
        backgroundColor: "#ABABAB",
        width: "fit-content",
        position: "relative",
        // top: "5%"
    },
    inputField: {
        width: "100%",
        fontSize: "15px",
        height: "40px",
        borderRadius: "5px",
        backgroundColor: "#797979",
        border: "none"
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