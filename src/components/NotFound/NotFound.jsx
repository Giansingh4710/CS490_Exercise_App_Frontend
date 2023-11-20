import "./NotFound.css";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="not-found">
      <h1>NOT FOUND</h1>
      <h2>Sorry, the page you are looking for cannot be found</h2>
      <h3>
        {" "}
        Click <Link to="/login">HERE </Link> to log in or{" "}
        <Link to="/register">HERE</Link> to register
      </h3>
    </div>
  );
}
