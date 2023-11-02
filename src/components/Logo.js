import { Link } from "react-router-dom"
export default function Logo({size}){
    return (
    <Link to="/">
        <img src={"./logo192.png"} alt="logo" width={size} height={size}/>
    </Link>
    )
}
