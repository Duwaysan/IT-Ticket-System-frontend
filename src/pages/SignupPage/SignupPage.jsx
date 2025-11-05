// IMPORTS
import { useState } from "react";
import { useNavigate } from "react-router";



// APIs
import * as usersAPI from "../../utilities/users-api.js"
import "./styles.css"

export default function SignupPage({ setUser }) {
    const navigate = useNavigate();
    const initialState = { username: "", nickname:"", password: "", confirmPassword: "", email: "" }
    const [formData, setFormData] = useState(initialState)
    const [errors, setErrors] = useState({ username: '', nickname: '', password: '', email: '', confirmPassword: '' });
    let disabledSubmitBtn = Object.values(errors).every(val => val === "") && Object.values(formData).every(val => val !== "") ? false : true

    function handleChange(evt) {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
        checkErrors(evt);
    }

    function checkErrors({ target }) {
        const updateErrors = { ...errors }

        if (target.name === 'username') {
            updateErrors.username = target.value.length < 3 ? 'Your username must be at least three characters long.' : "";
        }
        if (target.name === 'nickname') {
            updateErrors.nickname = target.value.length < 3 ? 'Your nickname must be at least three characters long.' : "";
        }
        if (target.name === 'password') {
            updateErrors.password = target.value.length < 3 ? "Your password must be at least three characters long." : "";
        }
        if (target.name === 'confirmPassword') {
            updateErrors.confirmPassword = target.value !== formData.password ? "Your passwords must match." : "";
        }
        if (target.name === 'email') {
            updateErrors.email = !target.value.includes("@") ? "Your password must be a real email / include the '@' symbol." : "";
        }

        setErrors(updateErrors);
    };

    async function handleSubmit(evt) {
        try {
            evt.preventDefault()
            const newUser = await usersAPI.signup(formData);
            console.log(newUser, "new user");
            setUser(newUser);
            setFormData(initialState)
            navigate("/tickets")
        } catch (err) {
            console.log(err);
            setUser(null);
        }
    }

    return (<>
  <header className="page-header">
    <h1>Create your account</h1>
  </header>

  <form onSubmit={handleSubmit} className="signup-form" noValidate>
    <div className="form-grid">
      <div className="field">
        <label htmlFor="id_username">Username</label>
        <input
          id="id_username"
          type="text"
          name="username"
          value={formData.username}
          minLength="3"
          maxLength="150"
          onChange={handleChange}
          autoComplete="username"
        />
        {errors.username && <span className="error">{errors.username}</span>}
      </div>

      <div className="field">
        <label htmlFor="id_nickname">Nickname</label>
        <input
          id="id_nickname"
          type="text"
          name="nickname"
          value={formData.nickname}
          minLength="3"
          maxLength="150"
          onChange={handleChange}
          autoComplete="nickname"
        />
        {errors.nickname && <span className="error">{errors.nickname}</span>}
      </div>

      <div className="field span-2">
        <label htmlFor="id_email">Email</label>
        <input
          id="id_email"
          type="email"
          name="email"
          value={formData.email}
          maxLength="150"
          onChange={handleChange}
          autoComplete="email"
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div className="field">
        <label htmlFor="id_password1">Password</label>
        <input
          id="id_password1"
          type="password"
          name="password"
          value={formData.password}
          minLength="3"
          onChange={handleChange}
          autoComplete="new-password"
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      <div className="field">
        <label htmlFor="id_password2">Confirm Password</label>
        <input
          id="id_password2"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          autoComplete="new-password"
        />
        {errors.confirmPassword && (
          <span className="error">{errors.confirmPassword}</span>
        )}
      </div>
    </div>

    <button type="submit" disabled={disabledSubmitBtn} className="submit-btn">
      Create account
    </button>
  </form>
</>
)
}