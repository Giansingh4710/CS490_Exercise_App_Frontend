import InputElement from "../AccountInputElement"
import Button from "../LandingPageButton";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegistrationForm(){
    const nav = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirm_password: '',
    });

    const [error, setError] = useState({
        hasError: null,
        errorText: ''
    })

    let additionalStyles = {
        width: "400px"
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // email input handled by type=email
        // Client side password match validation
        if(formData.password !== formData.confirm_password){
            setError({...setError,
                 hasError: true,
                 errorText: "ERROR: Passwords do not match."
            });
            return;
        }else{
            setError({...setError,
                hasError: false,
                errorText: ""
           });
        }

        // server side validation - email is not already registered,

        // for demo purpose bypass above and send to inital survery page
        nav("/Register/Survey", {state: {email: formData.email}});

    }

    const handleInputChange = (key, value) => {
        setFormData({
            ...formData,
            [key]: value,
        });
    }
    
    return (
        <div style={styles.div}>
            <form style={styles.form} onSubmit={handleSubmit} >
                <InputElement type="email" name="email" placeholder="youremail@example.com" label="EMAIL"
                    additionalStyles={additionalStyles}
                    onChange={handleInputChange}/>
                <InputElement type="password" name="password" placeholder="Password" label="PASSWORD" onChange={handleInputChange} />
                <InputElement type="password" name="confirm_password" placeholder="Confirm Password" label="CONFIRM PASSWORD" onChange={handleInputChange}/>
                <Button name="Create Account" type="submit" additionalStyles={styles.button}/>
            </form>
            {error.hasError != null && <p style={styles.formError}>{error.errorText}</p>}
        </div>
    )
}

const styles = {
    div: {
        margin: "auto",
        backgroundColor: "#3F4D67",
        width: "fit-content",
        position: "relative",
    },
    form: {
        display: "relative",
        textAlign: "center",
        backgroundColor: "#00000",
    },
    button: {
        backgroundColor: "#FFFFFF",
        color: "#3F4D67",
        fontSize: "24px",
        cursor: "pointer",
        width: "250px",
        height: "61px",
        borderRadius: "10px",
        margin: "auto",
        marginTop: "50px"
    },
    formError: {
        color: "#FF5C5C",
        fontStyle: "italic",
    }
}