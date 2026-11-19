import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react";

import { logout } from "../API/registerApi";
import { useModal } from "../context/ModalContext";

export function Header() {
  const [roomsOpen, setRoomsOpen] = useState(false);
 
  const {
    openBookingOrLogin,
    openLoginModal,
    logged,
    setLogged,
  } = useModal();

  // LOGOUT
  const handleLogout = async () => {
    try {
      await logout();
      setLogged(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="dark-background">
      <nav className="navbar navbar-expand-lg dark-background">
        <div className="container-fluid">

          {/* LOGO */}
          <Link className="navbar-brand white-text" to="/">
            <img src="photos/my-logo.png" alt="Logo" />
          </Link>

          {/* ROOMS DROPDOWN */}
          <li className="rooms-dropdown">
            <button
              type="button"
              className="rooms-dropdown-button light-text hover-accent-text"
              onClick={() => setRoomsOpen(!roomsOpen)}
              aria-expanded={roomsOpen}
              aria-label="Open rooms menu"
            >
              <Menu size={32} strokeWidth={2} />
            </button>

            {roomsOpen && (
              <ul className="rooms-dropdown-menu">

                {/* ROOMS AND PRICES */}
                <li>
                  <Link
                    className="rooms-dropdown-item light-text hover-accent-text"
                    to="/rooms"
                    onClick={() => setRoomsOpen(false)}
                  >
                    Rooms and prices
                  </Link>
                </li>

                {/* BOOKING */}
                <li>
                  <Link
                    to="/"
                    type="button"
                    className="rooms-dropdown-item light-text hover-accent-text"
                    onClick={() => {
                      openBookingOrLogin(null);
                    }}
                
                  >
                    Booking
                  </Link>
                </li>

                {/* SOCIAL MEDIA */}
                <li>
                  <div id="icons">

                    <a
                      href="https://facebook.com/"
                      aria-label="Facebook"
                      target="_blank"
                      rel="noreferrer"
                      className="accent-text"
                    >
                      <i className="bi bi-facebook fs-3"></i>
                    </a>

                    <a
                      href="https://instagram.com"
                      aria-label="Instagram"
                      target="_blank"
                      rel="noreferrer"
                      className="accent-text"
                    >
                      <i className="bi bi-instagram fs-3"></i>
                    </a>

                    <a
                      href="https://tiktok.com/"
                      aria-label="TikTok"
                      target="_blank"
                      rel="noreferrer"
                      className="accent-text"
                    >
                      <i className="bi bi-tiktok fs-3"></i>
                    </a>

                  </div>
                </li>

              </ul>
            )}
          </li>

          {/* NAVBAR TOGGLER */}
          <button
            className="navbar-toggler light-border"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              {/* HOME */}
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `light-text hover-accent-text ${
                      isActive ? "accent-text" : ""
                    }`
                  }
                  to="/"
                >
                  Home
                </NavLink>
              </li>

              {/* ABOUT */}
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `light-text hover-accent-text ${
                      isActive ? "accent-text" : ""
                    }`
                  }
                  to="/about"
                >
                  About Us
                </NavLink>
              </li>

            </ul>

            {/* SIGN UP */}
            <button
              id="register-btn"
              className="btn btn-nav-right light-text light-border hover-accent-background hover-dark-text"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#signupModal"
              style={{ display: logged ? "none" : "block" }}
            >
              Sign Up
            </button>

            {/* LOG IN */}
            <button
              id="login-btn"
              className="btn btn-nav-right accent-background dark-text accent-border hover-light-background"
              type="button"
              onClick={openLoginModal}
              style={{ display: logged ? "none" : "block" }}
            >
              Log in
            </button>

            {/* LOG OUT */}
            <button
              id="logout-btn"
              className="btn btn-nav-right accent-background dark-text accent-border hover-light-background"
              type="button"
              onClick={handleLogout}
              style={{ display: logged ? "block" : "none" }}
            >
              Log out
            </button>

          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
