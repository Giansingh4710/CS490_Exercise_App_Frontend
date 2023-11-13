export default function InputElement({type, name, placeholder, additionalStyles, label, options, onChange, elementError}){
    const handleChange = (event) => {
        const inputValue = event.target.value;
        onChange(name, inputValue);
    };

    if(type === "select"){
        return (
            <div style={styles.inputElementContainer}>
                <p style={styles.label}><span style={styles.required}>*</span> {label}</p>
                <Dropdown options={options} additionalStyles={additionalStyles} onChange={handleChange}/>
                <p style={styles.error}>{elementError}</p>
            </div>
        )
    }

    return (
        <div style={styles.inputElementContainer}>
            <p style={styles.label}><span style={styles.required}>*</span> {label}</p>
            <input type={type} name={name} placeholder={placeholder} onChange={handleChange} style={{...styles.inputField, ...additionalStyles}} required/>
            <p style={styles.error}>{elementError}</p>
        </div>
    )
}

function Dropdown({options, additionalStyles, onChange}){
    return (
        <select style={{...styles.inputField, ...additionalStyles}} onChange={onChange}>
            {    
                options.map((option, index) => (
                    <option key={index} value={index}> {option} </option>
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
    required: {
        color: "#FF5C5C"
    },
    error: {
        color: "#FF5C5C"
    }
}