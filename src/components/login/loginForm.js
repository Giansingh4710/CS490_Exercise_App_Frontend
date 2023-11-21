import InputElement from "../AccountInputElement";
import { useState } from "react";
import apiClient from "../../services/apiClient";
import { useAuthContext } from "../../contexts/auth";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });
  const [error, setError] = useState({
    hasError: null,
    errorText: "",
  });

  const handleInputChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const { setUser } = useAuthContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // email input handled by type=email
    // Client side password match validation
    const { data, error } = await apiClient.login({
      Email: formData.Email,
      Password: formData.Password,
    });
    if (data) {
      setUser(data.user);
      apiClient.setToken(data.token);
    }
    if (error) {
      const errorMessage = error ? error : "An unknown error occurred";
      setError({
        ...error,
        hasError: true,
        errorText: "ERROR: " + errorMessage,
      });
    }
  };

  return (
    <div style={styles.div}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <InputElement
          type="email"
          name="Email"
          placeholder="Enter Email"
          label="Enter Email"
          onChange={handleInputChange}
        />
        <InputElement
          type="password"
          name="Password"
          placeholder="Enter Password"
          label="Enter Password"
          onChange={handleInputChange}
        />
        <Button name={"Login"} />
      </form>
      {error.hasError != null && (
        <p style={styles.formError}>{error.errorText}</p>
      )}
    </div>
  );
}

function Button({ name }) {
  const hover = (e) => {
    e.target.style.background = "white";
    e.target.style.color = "#3F4D67";
  };
  const unHover = (e) => {
    e.target.style.background = "#FFFFFF";
    e.target.style.color = "3F4D67";
  };

  return (
    <button style={styles.button} onMouseEnter={hover} onMouseLeave={unHover}>
      {name}
    </button>
  );
}

const styles = {
  div: {
    margin: "auto",
    width: "fit-content",
    backgroundColor: "#3F4D67",
  },
  form: {
    display: "grid",
    "grid-template-columns": "400px",
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
    fontWeight: "bold",
  },
  formError: {
    color: "#FF5C5C",
    fontStyle: "italic",
  },
};
