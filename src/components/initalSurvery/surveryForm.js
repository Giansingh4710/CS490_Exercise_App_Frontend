import InputElement from '../InputElement'
export default function SurveyForm(){
    return (
        <form style={styles.form}>
            <InputGridElement type="text" name="First Name" placeholder="First name" gridArea="a" />
            <InputGridElement type="text" name="Last Name" placeholder="Last name" gridArea="b" />
            <InputGridElement type="email" name="Email" placeholder="Email" gridArea="c" />
            <InputGridElement type="tel" name="Phone Number" placeholder="Phone Number" gridArea="d" />
            <InputGridElement type="date" name="Date of Birth" gridArea="e" />
            <InputGridElement type="text" name="Gender" placeholder="Gender" gridArea="f" />
            <InputGridElement type="text" name="Weight" placeholder="Weight" gridArea="g" />
            <InputGridElement type="text" name="Height" placeholder="Height" gridArea="h" />
            <InputGridElement type="text" name="Role" placeholder="Role" gridArea="i" />
            <InputGridElement type="text" name="Activity Level" placeholder="Activity Level" gridArea="j" />
            <InputGridElement type="text" name="Goal" placeholder="Goal" gridArea="k"/>
        </form>
    )
}

function InputGridElement({type, name, placeholder, gridArea}){
    let gridPosition = {
        "gridArea": gridArea
    }
    return (
        <div style={gridPosition}>
            <InputElement type={type} name={name} placeholder={placeholder} label={name}/>
        </div>
    )       
}

const styles = {
    div: {
        position: "absolute",
        top: "50%",
        left: "27%"
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
}