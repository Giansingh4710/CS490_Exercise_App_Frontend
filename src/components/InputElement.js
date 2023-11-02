export default function InputElement({type, name, placeholder, additionalStyles, label}){
    return (
        <div style={styles.inputElementContainer}>
            <p style={styles.label}>{label}</p>
            <input type={type} name={name} placeholder={placeholder} style={{...styles.inputField, ...additionalStyles}}></input>
        </div>
    )
}

const styles = {
    inputField: {
        width: "100%",
        fontSize: "15px",
        height: "40px",
        borderRadius: "5px",
        backgroundColor: "#797979",
        border: "none"
    },
    inputElementContainer: {
        textAlign: "left"
    },
    label: {
        fontSize: "20px",
        fontWeight: "bold"
    }
}