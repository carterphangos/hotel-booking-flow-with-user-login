import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import "../assets/masterhead.css";

interface MastheadProps {
  currentPage: string;
}

export default function Masthead({ currentPage }: MastheadProps) {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  console.log(user);
  return (
    <header className="masthead">
      <div className="masthead-container">
        <div className="masthead-content">
          <div className="logo">
            <button onClick={() => navigate("/booking")} className="logo-button">
              <h1>HOTEL BOOKING</h1>
            </button>
          </div>

          <nav className="navigation">
            {user ? (
              <div className="user-section">
                <button className="nav-button" onClick={() => navigate("/dashboard")}>
                  Dashboard
                </button>
                <div className="user-menu">
                  <button className="user-button" onClick={() => setShowUserMenu(!showUserMenu)}>
                    {user.title} {user.name} ▼
                  </button>
                  {showUserMenu && (
                    <div className="user-dropdown">
                      <button onClick={() => navigate("/dashboard")}>My Bookings</button>
                      <button onClick={logout}>Logout</button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="auth-buttons">
                <button
                  className={`nav-button ${currentPage === "login" ? "active" : ""}`}
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className={`nav-button ${currentPage === "register" ? "active" : ""}`}
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
