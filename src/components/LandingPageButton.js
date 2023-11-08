export default function Button({name, additionalStyles}){

    const hover = (e) => {
        e.target.style.background = 'white';
        e.target.style.color = "#797979";

    }
    const unHover = (e) => {
        e.target.style.background = '#797979';
        e.target.style.color = "white";
    }
    
    return (
		<button style={{...styles.button, ...additionalStyles}} onMouseEnter={hover} onMouseLeave={unHover}>{name}</button>
	)
}

const styles = {
    button: {
        backgroundColor: "#797979",
        color: "white",
        fontSize: "24px",
        cursor: "pointer",
        borderRadius: "10px",
        border: "none"
    }
}