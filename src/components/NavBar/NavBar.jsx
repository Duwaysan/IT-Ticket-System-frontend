import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import * as usersAPI from "../../utilities/users-api";
import "./styles.css";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setIsOpen(false), []);

  function handleLogout(e) {
    e.preventDefault();
    usersAPI.logout();
    setUser(null);
    navigate("/");
  }

  return (
    <>
      <button  className="toggle-btn"  onClick={() => setIsOpen(v => !v)}  aria-expanded={isOpen}  aria-controls="side-nav">  ☰</button>

      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)} />}

      <nav id="side-nav" className={`side-nav ${isOpen ? "open" : ""}`}>
        <ul className="nav-elements">
          {user ? (
            <>
              <li><Link to="/about"  onClick={() => setIsOpen(false)}>About</Link></li>
              <li><Link to="/tickets" onClick={() => setIsOpen(false)}>All tickets</Link></li>
              {!user.profile.is_manager &&
              <li><Link to="/tickets/new" onClick={() => setIsOpen(false)}>New ticket</Link></li>}
              <li>
                <form onSubmit={handleLogout}>
                  <button type="submit">Log out</button>
                </form>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/Login"   onClick={() => setIsOpen(false)}>Login</Link></li>
              <li><Link to="/signup" onClick={() => setIsOpen(false)}>Sign Up</Link></li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}
