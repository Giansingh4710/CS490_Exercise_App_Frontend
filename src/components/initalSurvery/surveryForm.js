import { useState } from 'react';
import InputElement from '../AccountInputElement';

export default function SurveyForm(){
    const genderOptions = ["Select Gender","Male", "Female", "Other"]
    const roleOptions = ["Select User","Coach", "Client"]
    const activityOptions = ["Select Activity Level","Sedentary", "Moderate Activity", "High Activity"]
    const goalOptions = ["Select Goal","Lose Weight", "Gain Weight", "Maintain Weight", "Train for Sport"]
    const stateOptions = ["Select State", "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dob: '',
        gender: '',
        weight: '',
        height: '',
        role: '',
        activityLevel: '',
        goal: '',
        streetAddress: '',
        city: '',
        state: '',
        zipCode: ''
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

    const [streetAddress, setStreetAddressError] = useState({
        error: null,
        errorText: ""
    });

    const [city, setCityError] = useState({
        error: null,
        errorText: ""
    });

    const [state, setStateError] = useState({
        error: null,
        errorText: ""
    });

    const [zipCode, setZipCodeError] = useState({
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
        let errorFlag = false;

        // add validation for name using regex
        if(formData.firstName.length < 2){
            setFirstNameError({
                error: true,
                errorText: "First Name must be longer than 2 characters"
            });
            errorFlag = true;
        }else if(formData.firstName.match("[0-9]+|[-.!@#$%^&*()+/\\=<,>?_]+")){
            setFirstNameError({
                error: true,
                errorText: "First Name cannot contain numbers or special characters"
            });
            errorFlag = true;
        }else{
            setFirstNameError({
                error: false,
                errorText: ""
            });
            errorFlag = errorFlag || false;
        }
        
        if(formData.lastName.length < 2){
            setLastNameError({
                error: true,
                errorText: "Last Name must be longer than 2 characters"
            });
            errorFlag = true;
        }else if(formData.lastName.match("[0-9]+|[-.!@#$%^&*()+/\\=<,>?_]+")){
            setLastNameError({
                error: true,
                errorText: "Last Name cannot contain numbers or special characters"
            });
            errorFlag = true;
        }else{
            setLastNameError({
                error: false,
                errorText: ""
            });
            errorFlag = errorFlag || false;
        }

        if(formData.gender === "0"){
            setGenderError({
                error: true,
                errorText: "Please choose a gender"
            });
            errorFlag = true;
        }else{
            setGenderError({
                error: false,
                errorText: ""
            });
            setFormData({
                ...formData,
                gender: genderOptions[formData.gender],
            })
            errorFlag = errorFlag || false;
        }

        if(formData.role === "0"){
            setRoleError({
                error: true,
                errorText: "Please choose a role"
            });
            errorFlag = true;
        }else{
            setRoleError({
                error: false,
                errorText: ""
            });
            setFormData({
                ...formData,
                role: roleOptions[formData.role],
            })
            errorFlag = errorFlag || false;
        }

        if(formData.activityLevel === "0"){
            setActivityLevelError({
                error: true,
                errorText: "Please choose an activity level"
            });
            errorFlag = true;
        }else{
            setActivityLevelError({
                error: false,
                errorText: ""
            });
            setFormData({
                ...formData,
                activityLevel: activityOptions[formData.activityLevel],
            })
            errorFlag = errorFlag || false;
        }

        if(formData.goal === "0"){
            setGoalError({
                error: true,
                errorText: "Please choose a goal"
            });
            errorFlag = true;
        }else{
            setGoalError({
                error: false,
                errorText: ""
            });
            setFormData({
                ...formData,
                goal: goalOptions[formData.goal],
            })
            errorFlag = errorFlag || false;
        }

        // email validation is handeled by tag

        if(formData.phone.length !== 10){
            setPhoneError({
                error: true,
                errorText: "Please enter a valid phone number. No Dashes"
            })
            errorFlag = true;
        }else{
            setPhoneError({
                error: false,
                errorText: ""
            })
            errorFlag = errorFlag || false;
        }

        if(formData.weight <= 0){
            setWeightError({
                error: true,
                errorText: "Please enter a valid weight"
            })
            errorFlag = true;
        }else{
            setWeightError({
                error: false,
                errorText: ""
            })
            errorFlag = errorFlag || false;
        }

        if(formData.height <= 0){
            setHeightError({
                error: true,
                errorText: "Please enter a valid height"
            })
            errorFlag = true;
        }else{
            setHeightError({
                error: false,
                errorText: ""
            })
            errorFlag = errorFlag || false;
        }

        if(formData.streetAddress.length < 2){
            setStreetAddressError({
                error: true,
                errorText: "Please enter a valid street address"
            })
            errorFlag = true;
        }else{
            setStreetAddressError({
                error: false,
                errorText: ""
            })
            errorFlag = errorFlag || false;
        }

        if(formData.city.length < 2){
            setCityError({
                error: true,
                errorText: "Please enter a valid city"
            })
            errorFlag = true;
        }else{
            setCityError({
                error: false,
                errorText: ""
            })
            errorFlag = errorFlag || false;
        }

        if(formData.zipCode.length !== 5 || !formData.zipCode.match("^[0-9]{5}$")){
            setZipCodeError({
                error: true,
                errorText: "Please enter a valid zipcode"
            })
            errorFlag = true;
        }else if(formData.zipCode.length === 5){
            setZipCodeError({
                error: false,
                errorText: ""
            })
            errorFlag = errorFlag || false;
        }

        if(formData.state === "0"){
            setStateError({
                error: true,
                errorText: "Please select a state"
            })
            errorFlag = true;
        }else{
            setStateError({
                error: false,
                errorText: ""
            })
            setFormData({
                ...formData,
                state: stateOptions[formData.state]
            })
            errorFlag = errorFlag || false;
        }

        if(!formData.email.match("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")){
            setEmailError({
                error: true,
                errorText: "Please enter a valid email"
            })
            errorFlag = true
        }else{
            setEmailError({
                error: false,
                errorText: ""
            })
            errorFlag = errorFlag || false;
        }
        alert(formData.dob);
        if(formData.dob.length === 0){
            setDOBError({
                error: true,
                errorText: "Please enter a date"
            })
        }else{
            setDOBError({
                error: false,
                errorText: ""
            })
        }

        if(!errorFlag){
            alert("form submitted")
        }

    }

    return (
        <div style={styles.formContainer}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <InputGridElement type="text" name="firstName" label="First Name" placeholder="First name" gridArea="a" elementError={firstName.errorText} onChange={handleInputChange}/>
                <InputGridElement type="text" name="lastName" label="Last Name" placeholder="Last name" gridArea="b" elementError={lastName.errorText} onChange={handleInputChange}/>
                <InputGridElement type="email" name="email" label="Email" placeholder="Email" gridArea="c" elementError={email.errorText} onChange={handleInputChange}/>
                <InputGridElement type="tel" name="phone" label="Phone Number" placeholder="Phone Number" gridArea="d" elementError={phone.errorText} onChange={handleInputChange}/>
                <InputGridElement type="date" name="dob" label="Date of Birth"gridArea="e" elementError={dob.errorText} onChange={handleInputChange}/>
                <InputGridElement type="select" name="gender" label="Gender" gridArea="f" options={genderOptions} elementError={gender.errorText} onChange={handleInputChange}/>
                <InputGridElement type="text" name="weight" label="Weight" placeholder="Weight" gridArea="g" units="lbs" elementError={weight.errorText} onChange={handleInputChange}/>
                <InputGridElement type="text" name="height" label="Height" placeholder="Height" gridArea="h" units="in" elementError={height.errorText} onChange={handleInputChange}/>
                <InputGridElement type="select" name="role" label="Role" gridArea="i" options={roleOptions} elementError={role.errorText} onChange={handleInputChange}/>
                <InputGridElement type="select" name="activityLevel" label="Activity Level" gridArea="j" options={activityOptions} elementError={activityLevel.errorText} onChange={handleInputChange}/>
                <InputGridElement type="select" name="goal" label="Goal" gridArea="k" options={goalOptions} elementError={goal.errorText} onChange={handleInputChange}/>
                <InputGridElement type="text" name="streetAddress" label="Street Address" placeholder="Enter Your Street" gridArea="m" elementError={streetAddress.errorText} onChange={handleInputChange}/>
                <InputGridElement type="text" name="city" label="City" placeholder="Enter Your City" gridArea="n" elementError={city.errorText} onChange={handleInputChange}/>
                <InputGridElement type="select" name="state" label="State" gridArea="o" options={stateOptions} elementError={state.errorText} onChange={handleInputChange}/>
                <InputGridElement type="text" name="zipCode" label="Zip Code" placeholder="5 Digit Zip Code" gridArea="p" elementError={zipCode.errorText} onChange={handleInputChange}/>
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
                                 "m n o p"
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