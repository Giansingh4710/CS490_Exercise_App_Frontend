import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function LoginModal(){
    const [form, setForm] = useState({
        email: "Email",
        password: "Password"
    });

    return (
    <div style={styles.modal}>
        <h2 style={styles.h2}>Login</h2>
        <form id="registration">
            <InputElement input_type="text" value={form.email}
                onChange={e => {
                    setForm({
                        ...form,
                        email: e.target.value,
                    });
                }}
            />
            <InputElement input_type="password" value={form.password}
                onChange={e => {
                    setForm({
                        ...form,
                        password: e.target.value,
                    });
                }}
            />
            <LoginButton />
        </form>
        <p>Dont Have an Account?</p>
        <ATag href='/register' style={styles.navLink}>Sign Up</ATag>
    </div>
    );
}

function LoginButton(){
    return (
        <button style={styles.loginButton}>Login</button>
    )
}

function InputElement({input_type}){
    return (
        <input type={input_type} style={styles.inputElement}></input>
    )
}

function ATag({ href, children }) {
    return (
        <Link to={href} style={styles.navLink} className='linkATag'>
          {children}
        </Link>
    )
}

const styles = {
    navLink: {
      textDecoration: 'none',
      color: '#0000FF',
      margin: '0 15px',
    },
    modal:{
        width: "30%",
        height: "500px",
        margin: "auto",
        marginTop: "10%",
        backgroundColor: "white",
        border: "2px solid black",
        borderRadius: "10px"
    },
    inputElement:{
        width: "75%",
        fontSize: "15px",
        height: "40px",
        borderRadius: "5px",
        marginTop: "10px",
    },
    loginButton: {
        backgroundColor: "#0072d0",
        color: "white",
        fontSize: "20px",
        padding: "10px 60px",
        marginTop: "20px",
        cursor: "pointer",
        marginBottom: "80px",
        width: "75%",
    },
    h2: {
        marginTop: "30px",
        marginBottom: "40px",
    }
}