import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import * as usersAPI from "../../utilities/users-api";
import "./styles.css";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setIsOpen(true), []);

  function handleLogout(e) {
    e.preventDefault();
    usersAPI.logout();
    setUser(null);
    navigate("/");
  }

  return (
<>
  <button className="toggle-btn" onClick={() => setIsOpen(o => !o)} aria-expanded={isOpen} aria-controls="side-nav" > ☰ </button>


  <nav id="side-nav" className={`side-nav ${isOpen ? "open" : ""}`}>
  <div className="nav-header">
    <Link
      to={user ? "/tickets" : "/login"}
      className="brand"
      onClick={() => setIsOpen(true)}
    >
      IT Ticket System
    </Link>
  </div>

  <ul className="nav-elements">
    {user ? (
      <>
        <li><Link to="/about" onClick={() => setIsOpen(true)}>About</Link></li>
        <li><Link to="/tickets" onClick={() => setIsOpen(true)}>All tickets</Link></li>
        {!user.profile.is_manager && (
          <li><Link to="/tickets/new" onClick={() => setIsOpen(true)}>New ticket</Link></li>
        )}
      </>
    ) : (
      <>
        <li><Link to="/login" onClick={() => setIsOpen(true)}>Login</Link></li>
        <li><Link to="/signup" onClick={() => setIsOpen(true)}>Sign Up</Link></li>
      </>
    )}
  </ul>

  {/* Bottom area */}
  {user && (
    <div className="nav-bottom">
      <div className="user-card">
        <div className="avatar">
          {user.profile?.nickname?.[0]?.toUpperCase() || user.username?.[0]?.toUpperCase() || "U"}
        </div>
        <div className="user-meta">
          <div className="name">{user.profile?.nickname || user.username}</div>
          <div className="role">{user.profile?.is_manager ? "Manager" : "Employee"}</div>
        </div>
      </div>

      <form onSubmit={handleLogout}>
        <button type="submit" className="logout-btn">Log out</button>
      </form>
    </div>
  )}
</nav>

</>

  );
}
