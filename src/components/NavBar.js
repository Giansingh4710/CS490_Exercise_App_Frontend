import RedirectButton from "./RedirectButton";

export default function NavBar({buttons, }){


    return (
    <div style={styles.navbar}>
        <div style={styles.logo}>
            <Logo size="50"/>
        </div>
        <RedirectButton name="Register" redirect="Register" additionalStyles={additionalStyles}/>
    </div>
    )

}