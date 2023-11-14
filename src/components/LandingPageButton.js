export default function Button({name, additionalStyles}){

    const hover = (e) => {
        e.target.style.background = '#c4c4c4';
        e.target.style.color = "#3F4D67";

    }
    const unHover = (e) => {
        e.target.style.background = '#FFFFFF';
        e.target.style.color = "#3F4D67";
    }
    
    return (
		<button style={{...styles.button, ...additionalStyles}} onMouseEnter={hover} onMouseLeave={unHover}>{name}</button>
	)
}

const styles = {
    button: {
        backgroundColor: "#FFFFFF",
        color: "#3F4D67",
        fontSize: "24px",
        cursor: "pointer",
        borderRadius: "10px",
        fontWeight: "bold"
    }
}