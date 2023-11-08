import InputElement from '../AccountInputElement';

export default function SurveyForm(){
    const genderOptions = ["Select Gender","Male", "Female", "Other"]
    const roleOptions = ["Select User","Coach", "Client"]
    const activityOptions = ["Select Activity Level","Low", "Moderate", "High"]
    const goalOptions = ["Select Goal","Lose Weight", "Gain Weight", "Maintain Weight", "Build Muscle"]
    return (
        <div style={styles.formContainer}>
            <form style={styles.form}>
                <InputGridElement type="text" name="First Name" placeholder="First name" gridArea="a" />
                <InputGridElement type="text" name="Last Name" placeholder="Last name" gridArea="b" />
                <InputGridElement type="email" name="Email" placeholder="Email" gridArea="c" />
                <InputGridElement type="tel" name="Phone Number" placeholder="Phone Number" gridArea="d" />
                <InputGridElement type="date" name="Date of Birth" gridArea="e" />
                <InputGridElement type="select" name="Gender" placeholder="Gender" gridArea="f" options={genderOptions} />
                <InputGridElement type="text" name="Weight" placeholder="Weight" gridArea="g" units="lbs" />
                <InputGridElement type="text" name="Height" placeholder="Height" gridArea="h" units="in"/>
                <InputGridElement type="select" name="Role" placeholder="Role" gridArea="i" options={roleOptions}/>
                <InputGridElement type="select" name="Activity Level" placeholder="Activity Level" gridArea="j" options={activityOptions}/>
                <InputGridElement type="select" name="Goal" placeholder="Goal" gridArea="k" options={goalOptions}/>
                <Button name="Submit"/>
            </form>
        </div>
    )
}

function InputGridElement({type, name, placeholder, gridArea, options, units}){
    let gridPosition = {
        "gridArea": gridArea
    }
    let additionalStyles = {
        backgroundColor: "#FFFFFF"
    }
    if(units !== ""){
        return (
            <div style={gridPosition}>
                <span style={styles.inputUnit}>{units}</span>
                <InputElement type={type} name={name} placeholder={placeholder} label={name} additionalStyles={additionalStyles} options={options}/>
            </div>
        ) 
    }
    return (
        <div style={gridPosition}>
            <InputElement type={type} name={name} placeholder={placeholder} label={name} additionalStyles={additionalStyles} options={options}/>
        </div>
    )       
}

function Button({name}){
    const hover = (e) => {
        e.target.style.background = '#b0aeae';
        e.target.style.color = "#000000";

    }
    const unHover = (e) => {
        e.target.style.background = '#D9D9D9';
        e.target.style.color = "#000000";
    }
    
    return (
		<button style={styles.submitButton} onMouseEnter={hover} onMouseLeave={unHover}>{name}</button>
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
        "gridTemplateAreas" :`   "a a b b"
                                 "c c d d"
                                 "e f g h"
                                 "i j k k"
                                 "l l l l" `,
        "gridGap": "50px 50px",
        margin: "auto",
        width: "85%",

    },
    formContainer: {
        position: "relative",
        top: "10%",
        margin: "auto"
    },
    submitButton: {
        gridArea: "l",
        backgroundColor: "#3F4D67",
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: "24px",
        cursor: "pointer",
        borderRadius: "10px",
        border: "none",
        width: "153px",
        height: "57px",
        display: "block",
        margin: "auto"

    
    },
    inputUnit: {
        position: "relative",
        float: "right",
        paddingRight: "5px",
        top: "75px",
        zIndex: "1",
        color: "#000000",
        fontWeight: "bold"

    }
}