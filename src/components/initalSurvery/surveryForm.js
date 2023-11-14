import { useState } from 'react';
import InputElement from '../AccountInputElement';
import { useNavigate } from 'react-router-dom';

export default function SurveyForm(){
    const nav = useNavigate();
    const genderOptions = ["Select Gender","Male", "Female", "Other"]
    const roleOptions = ["Select User","Coach", "Client"]
    const activityOptions = ["Select Activity Level","Sedentary", "Moderate Activity", "High Activity"]
    const goalOptions = ["Select Goal","Lose Weight", "Gain Weight", "Maintain Weight", "Train for Sport"]
    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        Email: '',
        PhoneNum: '',
        DOB: '',
        Gender: '',
        Weight: '',
        Height: '',
        Role: '',
        ActivityLevel: '',
        Goal: '',
    });

    const [firstName, setFirstNameError] = useState({
        error: null,
        errorText: ""
    });

    const [lastName, setLastNameError] = useState({
        error: null,
        errorText: ""
    });

    const [email, setEmailError] = useState({
        error: null,
        errorText: ""
    });

    const [phone, setPhoneError] = useState({
        error: null,
        errorText: ""
    });

    const [gender, setGenderError] = useState({
        error: null,
        errorText: ""
    });

    const [dob, setDOBError] = useState({
        error: null,
        errorText: ""
    });

    const [weight, setWeightError] = useState({
        error: null,
        errorText: ""
    });

    const [height, setHeightError] = useState({
        error: null,
        errorText: ""
    });

    const [role, setRoleError] = useState({
        error: null,
        errorText: ""
    });

    const [activityLevel, setActivityLevelError] = useState({
        error: null,
        errorText: ""
    });

    const [goal, setGoalError] = useState({
        error: null,
        errorText: ""
    });

    const handleInputChange = (key, value) => {
        setFormData({
            ...formData,
            [key]: value,
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if(formData.FirstName.length < 2){
            setFirstNameError({
                error: true,
                errorText: "First Name must be longer than 2 characters"
            });
        }else{
            setFirstNameError({
                error: false,
                firstName: ""
            });
        }
        
        if(formData.LastName.length < 2){
            setLastNameError({
                error: true,
                errorText: "Last Name must be longer than 2 characters"
            });
        }else{
            setLastNameError({
                error: false,
                errorText: ""
            });
        }

        if(formData.Gender === "0"){
            setGenderError({
                error: true,
                errorText: "Please choose a gender"
            });
        }else{
            setGenderError({
                error: false,
                errorText: ""
            });
            setFormData({
                ...formData,
                gender: genderOptions[formData.Gender],
            })
        }

        if(formData.Role === "0"){
            setRoleError({
                error: true,
                errorText: "Please choose a role"
            });
        }else{
            setRoleError({
                error: false,
                errorText: ""
            });
            setFormData({
                ...formData,
                Role: roleOptions[formData.Role],
            })
        }

        if(formData.activityLevel === "0"){
            setActivityLevelError({
                error: true,
                errorText: "Please choose an activity level"
            });
        }else{
            setActivityLevelError({
                error: false,
                errorText: ""
            });
            setFormData({
                ...formData,
                ActivityLevel: activityOptions[formData.activityLevel],
            })
        }

        if(formData.Goal === "0"){
            setGoalError({
                error: true,
                errorText: "Please choose a goal"
            });
        }else{
            setGoalError({
                error: false,
                errorText: ""
            });
            setFormData({
                ...formData,
                Goal: goalOptions[formData.Goal],
            })
        }

        // email validation is handeled by tag

        if(formData.PhoneNum.length !== 10){
            setPhoneError({
                error: true,
                errorText: "Please enter a valid phone number. No Dashes"
            })
        }else{
            setPhoneError({
                error: false,
                errorText: ""
            })
        }

        if(formData.Weight <= 0){
            setWeightError({
                error: true,
                errorText: "Please enter a valid weight"
            })
        }else{
            setWeightError({
                error: false,
                errorText: ""
            })
        }

        if(formData.Height <= 0){
            setHeightError({
                error: true,
                errorText: "Please enter a valid height"
            })
        }else{
            setHeightError({
                error: false,
                errorText: ""
            })
        }

        fetch("http://127.0.0.1:1313/register/initalSurvey/", {
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
            console.log(formData);
            if(response.status === 404){
                setEmailError({
                    hasError: true,
                    errorText: response.error_message
                })
            }else if(response.status === 200){
                nav("/UserDashboard");
            }
        })

    }

    return (
        <div style={styles.formContainer}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <InputGridElement type="text" name="FirstName" label="First Name" placeholder="First name" gridArea="a" elementError={firstName.errorText} onChange={handleInputChange}/>
                <InputGridElement type="text" name="LastName" label="Last Name" placeholder="Last name" gridArea="b" elementError={lastName.errorText} onChange={handleInputChange}/>
                <InputGridElement type="email" name="Email" label="Email" placeholder="Email" gridArea="c" elementError={email.errorText} onChange={handleInputChange}/>
                <InputGridElement type="tel" name="PhoneNum" label="Phone Number" placeholder="Phone Number" gridArea="d" elementError={phone.errorText} onChange={handleInputChange}/>
                <InputGridElement type="date" name="DOB" label="Date of Birth"gridArea="e" elementError={dob.errorText} onChange={handleInputChange}/>
                <InputGridElement type="select" name="Gender" label="Gender" placeholder="Gender" gridArea="f" options={genderOptions} elementError={gender.errorText} onChange={handleInputChange}/>
                <InputGridElement type="text" name="Weight" label="Weight" placeholder="Weight" gridArea="g" units="lbs" elementError={weight.errorText} onChange={handleInputChange}/>
                <InputGridElement type="text" name="Height" label="Height" placeholder="Height" gridArea="h" units="in" elementError={height.errorText} onChange={handleInputChange}/>
                <InputGridElement type="select" name="Role" label="Role" placeholder="Role" gridArea="i" options={roleOptions} elementError={role.errorText} onChange={handleInputChange}/>
                <InputGridElement type="select" name="ActivityLevel" label="Activity Level" placeholder="Activity Level" gridArea="j" options={activityOptions} elementError={activityLevel.errorText} onChange={handleInputChange}/>
                <InputGridElement type="select" name="Goal" label="Goal" placeholder="Goal" gridArea="k" options={goalOptions} elementError={goal.errorText} onChange={handleInputChange}/>
                <Button name="Submit" type="submit"/>
            </form>
        </div>
    )
}

function InputGridElement({type, name, label, placeholder, gridArea, options, units, onChange, elementError}){
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
                <InputElement type={type} name={name} placeholder={placeholder} label={label} additionalStyles={additionalStyles} options={options} onChange={onChange} elementError={elementError}/>
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
        left: "27%",
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
        margin: "auto",
        marginBottom: "50px"

    
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