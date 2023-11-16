import InputElement from "../AccountInputElement";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm(){
    const nav = useNavigate();
    const [formData, setFormData] = useState({
        Email: '',
        Password: ''
    });
    const [error, setError] = useState({
        hasError: null,
        errorText: ''
    })

    const handleInputChange = (key, value) => {
        setFormData({
            ...formData,
            [key]: value,
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch("http://127.0.0.1:1313/login/", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": '*'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
        console.log(response);
        if(response.status === 404){
            setError({
                ...error,
                hasError: true,
                errorText: "ERROR: Email is not registered"
            })
        }else if(response.status === 401){
            setError({
                ...error,
                hasError: true,
                errorText: "ERROR: Incorrect Username or Password"
            })
        }else if(response.status === 200){
            nav("/UserDashboard");
        }
    })
    }

    return (
        <div style={styles.div}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <InputElement type="email" name="Email" placeholder="Enter Email" label="Enter Email" onChange={handleInputChange}/>
                <InputElement type="password" name="Password" placeholder="Enter Password" label="Enter Password" onChange={handleInputChange}/>
                <Button name={"Login"}/>
            </form>
            {error.hasError != null && <p style={styles.formError}>{error.errorText}</p>}
        </div>
    )
}

function Button({name}){
    const hover = (e) => {
        e.target.style.background = 'white';
        e.target.style.color = "#3F4D67";

    }
    const unHover = (e) => {
        e.target.style.background = '#FFFFFF';
        e.target.style.color = "3F4D67";
    }

	return (
		<button style={styles.button} onMouseEnter={hover} onMouseLeave={unHover}>{name}</button>
	)
}

const styles = {
    div: {
        margin: "auto",
        width: "fit-content",
        backgroundColor: "#3F4D67"
    },
    form: {
        display: "grid",
        "grid-template-columns" : "400px",
        "grid-gap": "50px 50px",
    },
    button: {
        backgroundColor: "#FFFFFF",
        color: "#3F4D67",
        fontSize: "24px",
        cursor: "pointer",
        width: "166px",
        height: "61px",
        borderRadius: "10px",
        margin: "auto",
        marginTop: "50px",
        border: "none",
        fontWeight: "bold"
    },
    formError: {
        color: "#FF5C5C",
        fontStyle: "italic",
    }
}