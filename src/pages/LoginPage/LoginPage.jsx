import "./styles.css";
import { useState } from "react";

import * as usersAPI from "../../utilities/users-api";
import { useNavigate } from "react-router";

export default function LoginPage({ user, setUser }) {
  const initialState = { username: "", password: "" }
  const [formData, setFormData] = useState(initialState)
  const navigate = useNavigate();
  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value})
  }


async function handleLogin(evt) {
    try {
      evt.preventDefault();
      const loggedInUser = await usersAPI.login(formData);
      console.log(loggedInUser, "logged in user");
      setUser(loggedInUser);
      
      navigate("/tickets");
    } catch (err) {
      setUser(null);
    }
}

  return (<>
  {!user && (
    <>
      <header className="page-header">
        <h1>Welcome back</h1>
        <p className="sub">Please sign in to continue.</p>
      </header>

      <form onSubmit={handleLogin} className="login-form" noValidate>
        <div className="field">
          <label htmlFor="id_username">Username</label>
          <input
            id="id_username"
            type="text"
            name="username"
            value={formData.username}
            maxLength="150"
            required
            autoComplete="username"
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label htmlFor="id_password">Password</label>
          <input
            id="id_password"
            type="password"
            name="password"
            value={formData.password}
            required
            autoComplete="current-password"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="login-btn">Log in</button>
      </form>
    </>
  )}
</>
)
}