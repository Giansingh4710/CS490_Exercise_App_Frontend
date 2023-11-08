export default function InputElement({type, name, placeholder, additionalStyles, label, options, units}){
    if(type === "select"){
        return (
            <div style={styles.inputElementContainer}>
                <p style={styles.label}>{label}</p>
                <Dropdown options={options} additionalStyles={additionalStyles}/>
            </div>
        )
    }
    return (
        <div style={styles.inputElementContainer}>
            <p style={styles.label}>{label}</p>
            <input type={type} name={name} placeholder={placeholder} style={{...styles.inputField, ...additionalStyles}} />
        </div>
    )
}

function Dropdown({options, additionalStyles}){
    return (
        <select style={{...styles.inputField, ...additionalStyles}}>
            {    
                options.map((option, index) => (
                    <option key={index} value={option}> {option} </option>
                ))
            }
        </select>
    )
}

const styles = {
    inputField: {
        width: "100%",
        fontSize: "15px",
        height: "40px",
        borderRadius: "5px",
        backgroundColor: "#FFFFFF",
        border: "1px solid gray"
    },
    inputElementContainer: {
        textAlign: "left"
    },
    label: {
        fontSize: "20px",
        fontWeight: "bold",
        color: "#000000"
    },
    inputUnit: {
        position: "relative",
        float: "right",
        paddingRight: "5px",
        top: "32px",
        zIndex: "1",
        color: "#000000",
        fontWeight: "bold"

    }
}