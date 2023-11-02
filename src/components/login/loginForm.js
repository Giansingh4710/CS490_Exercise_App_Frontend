export default function LoginForm(){
    return (
        <div style={styles.div}>
            <form style={styles.form}>
                <InputElement type="email" name="EMAIL" placeholder="Email"/>
                <InputElement type="password" name="PASSWORD" placeholder="Password"/>
            </form>
            <Button name={"Login"}/>
        </div>
    )
}

function InputElement({type, name, placeholder}){
    return (
        <div style={styles.inputElement}>
            <p style={styles.inputLabel}>ENTER {name}:</p>
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
        // paddingTop: "2%",
    },
    inputField: {
        width: "517px",
        fontSize: "15px",
        height: "40px",
        borderRadius: "5px",
        backgroundColor: "#797979",
        border: "none"
    },
    inputLabel: {
        fontSize: "20px",
    },
    form: {
        margin: "auto",
        width: "fit-content",
    },
    inputElement: {
        paddingTop: "25px"
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