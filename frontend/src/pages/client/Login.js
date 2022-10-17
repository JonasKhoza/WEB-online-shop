import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../components/form/form.module.css";
function Login() {
  const Navigate = useNavigate();
  const [error, setError] = useState("");
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function onChange(event) {
    const { name, value } = event.target;
    setUser((prevUser) => {
      return { ...prevUser, [name]: value };
    });
  }

  async function submitUser(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/users/login", {
        method: "POST",

        body: JSON.stringify(user),
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },

        mode: "cors",
        credentials: "include",
      });
      setLoading(false);
      if (res.ok) {
        const data = await res.json();

        if (data.message) {
          return setError(data.message);
        }
        Navigate("/");
      }
    } catch (error) {
      setServerError(error.message);
      console.log(error);
    }
  }

  function showPassword() {
    const passwordElement = document.getElementById("password");

    if ((passwordElement.type = "password" && !passwordShown)) {
      passwordElement.type = "text";
      setPasswordShown((prev) => !prev);
    } else {
      passwordElement.type = "password";
      setPasswordShown((prev) => !prev);
    }
  }
  return (
    <main>
      <h1>Login</h1>
      {error && (
        <section className="alert">
          <h2> Invalid Input</h2>
          <p>{error}</p>
        </section>
      )}

      {loading ? (
        <p style={{ marginTop: "3rem" }}>Loading...</p>
      ) : serverError ? (
        <p style={{ marginTop: "3rem" }}>{serverError}</p>
      ) : (
        <form onSubmit={submitUser}>
          <p>
            <label htmlFor="email">E-Mail:</label>
          </p>
          <input
            type="email"
            id="email"
            name="email"
            onChange={onChange}
            required
          />

          <p>
            <label htmlFor="password">Password:</label>
          </p>
          <input
            type="password"
            id="password"
            name="password"
            onChange={onChange}
            required
          />
          <span onClick={showPassword}>{passwordShown ? "Hide" : "Show"}</span>
          <p>
            <button style={{ cursor: "pointer" }}>Login</button>
          </p>

          <p>
            <Link to="/users/signup">Create new user</Link>
          </p>
        </form>
      )}
    </main>
  );
}

export default Login;
