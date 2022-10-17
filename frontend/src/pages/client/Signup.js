import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../../components/form/form.module.css";

function Signup() {
  const Navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoaing] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    fullname: "",
    street: "",
    postal: "",
    city: "",
    contacts: "",
  });

  function onChange(event) {
    const { name, value } = event.target;
    setUser((prevUser) => {
      return { ...prevUser, [name]: value };
    });
  }
  async function createUser(event) {
    event.preventDefault();
    setLoaing(true);
    try {
      const res = await fetch("http://localhost:5000/users/signup", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLoaing(false);
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          Navigate("/users/login");
        } else {
          setError(data);
        }
      }
    } catch (error) {
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
      <h1>Create new account</h1>
      {error && (
        <section className="alert">
          <h2>Invalid data</h2>
          <p>{error.message}</p>
        </section>
      )}

      {loading ? (
        <p style={{ marginTop: "3rem" }}>Loading...</p>
      ) : (
        <form onSubmit={createUser}>
          <p>
            <label htmlFor="email">E-Mail:</label>
          </p>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
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
            value={user.password}
            onChange={onChange}
            required
          />
          <span onClick={showPassword}>{passwordShown ? "Hide" : "Show"}</span>

          <hr />
          <p>
            <label htmlFor="fullname">FullName:</label>
          </p>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={user.fullname}
            onChange={onChange}
            required
          />
          <p>
            <label htmlFor="street">Street:</label>
          </p>
          <input
            type="text"
            id="street"
            name="street"
            value={user.street}
            onChange={onChange}
            required
          />
          <p>
            <label htmlFor="postal">Postal Code:</label>
          </p>
          <input
            type="text"
            id="postal"
            name="postal"
            value={user.postal}
            onChange={onChange}
            required
          />
          <p>
            <label htmlFor="city">City:</label>
          </p>
          <input
            type="text"
            id="city"
            name="city"
            value={user.city}
            onChange={onChange}
            required
          />
          <p>
            <label htmlFor="contacts">Contacts:</label>
          </p>
          <input
            type="tel"
            id="contacts"
            name="contacts"
            placeholder="078-433-9678"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            value={user.contacts}
            onChange={onChange}
            required
          />
          <p>
            <button style={{cursor: "pointer"}}>Create account</button>
          </p>
          <p>
            <Link to="/users/login">Login instead</Link>
          </p>
        </form>
      )}
    </main>
  );
}

export default Signup;
