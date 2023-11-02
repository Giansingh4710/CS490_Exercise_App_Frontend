export default function SurveyForm(){
    return (
        <form style={styles.form}>
            {/* <InputElement1 type="text" style={{"gridArea": "a"}} /> */}
            {/* <InputElement1 type="text" gridArea="a" /> */}
            <InputElement type="text" name="First Name" placeholder="First name" gridArea="a" />
            <InputElement type="text" name="Last Name" placeholder="Last name" gridArea="b" />
            <InputElement type="email" name="Email" placeholder="Email" gridArea="c" />
            <InputElement type="tel" name="Phone Number" placeholder="Phone Number" gridArea="d" />
            <InputElement type="date" name="Date of Birth" gridArea="e" />
            <InputElement type="text" name="Gender" placeholder="Gender" gridArea="f" />
            <InputElement type="text" name="Weight" placeholder="Weight" gridArea="g" />
            <InputElement type="text" name="Height" placeholder="Height" gridArea="h" />
            <InputElement type="text" name="Role" placeholder="Role" gridArea="i" />
            <InputElement type="text" name="Activity Level" placeholder="Activity Level" gridArea="j" />
            <InputElement type="text" name="Goal" placeholder="Goal" gridArea="k"/>
            
        </form>
    )
}

function InputElement({type, name, placeholder, gridArea}){
    if(gridArea === "a")
        return (
            <div style={{"gridArea": "a"}}>
                <p>ENTER {name}</p>
                <input type={type} name={name} placeholder={placeholder} style={styles.inputField} ></input>
            </div>
        )
    else if(gridArea === "b")
        return (
            <div style={{"gridArea": "b"}}>
                <p>ENTER {name}</p>
                <input type={type} name={name} placeholder={placeholder} style={styles.inputField} ></input>
            </div>
        )
    else if(gridArea === "c")
        return (
            <div style={{"gridArea": "c"}}>
                <p>ENTER {name}</p>
                <input type={type} name={name} placeholder={placeholder} style={styles.inputField} ></input>
            </div>
        )
    else if(gridArea === "d")
        return (
            <div style={{"gridArea": "d"}}>
                <p>ENTER {name}</p>
                <input type={type} name={name} placeholder={placeholder} style={styles.inputField} ></input>
            </div>
        )
    else if(gridArea === "e")
        return (
            <div style={{"gridArea": "e"}}>
                <p>ENTER {name}</p>
                <input type={type} name={name} placeholder={placeholder} style={styles.inputField} ></input>
            </div>
        )
    else if(gridArea === "f")
        return (
            <div style={{"gridArea": "f"}}>
                <p>ENTER {name}</p>
                <input type={type} name={name} placeholder={placeholder} style={styles.inputField} ></input>
            </div>
        )
    else if(gridArea === "g")
        return (
            <div style={{"gridArea": "g"}}>
                <p>ENTER {name}</p>
                <input type={type} name={name} placeholder={placeholder} style={styles.inputField} ></input>
            </div>
        )
    else if(gridArea === "h")
        return (
            <div style={{"gridArea": "h"}}>
                <p>ENTER {name}</p>
                <input type={type} name={name} placeholder={placeholder} style={styles.inputField} ></input>
            </div>
        )
    else if(gridArea === "i")
        return (
            <div style={{"gridArea": "i"}}>
                <p>ENTER {name}</p>
                <input type={type} name={name} placeholder={placeholder} style={styles.inputField} ></input>
            </div>
        )
    else if(gridArea === "j")
        return (
            <div style={{"gridArea": "j"}}>
                <p>ENTER {name}</p>
                <input type={type} name={name} placeholder={placeholder} style={styles.inputField} ></input>
            </div>
        )
    else if(gridArea === "k")
        return (
            <div style={{"gridArea": "k"}}>
                <p>ENTER {name}</p>
                <input type={type} name={name} placeholder={placeholder} style={styles.inputField} ></input>
            </div>
        )
        
}


const styles = {
    div: {
        position: "absolute",
        top: "50%",
        left: "27%"
    },
    inputField: {
        width: "100%",
        fontSize: "15px",
        height: "40px",
        borderRadius: "5px",
        backgroundColor: "#797979",
    },
    form: {
        display: "grid",
        "grid-template-areas" :` "a a b b"
                                 "c c d d"
                                 "e f g h"
                                 "i j k k" `,
        "grid-gap": "50px 50px",
        margin: "auto",
        width: "fit-content"
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