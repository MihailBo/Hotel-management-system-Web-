import { Link, NavLink } from "react-router-dom";

import { useState } from "react";

function Header() {
  const [roomsOpen, setRoomsOpen] = useState(false);

  return (
    <header className="dark-background">
      <nav className="navbar navbar-expand-lg dark-background">
        <div className="container-fluid">
          <Link className="navbar-brand white-text" to="/">
            <img src="photos/my-logo.png" alt="Logo" />
          </Link>

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

              {/* ROOMS DROPDOWN */}
              <li className="rooms-dropdown">
                <button
                  type="button"
                  className="rooms-dropdown-button light-text hover-accent-text"
                  onClick={() => setRoomsOpen(!roomsOpen)}
                  aria-expanded={roomsOpen}
                >
                  menu
                  <span className="dropdown-arrow">
                    {roomsOpen ? "▲" : "▼"}
                  </span>
                </button>

                {roomsOpen && (
                  <ul className="rooms-dropdown-menu">
                    <li>
                      <Link
                        className="rooms-dropdown-item light-text"
                        to="/rooms"
                        onClick={() => setRoomsOpen(false)}
                      >
                        Rooms and prices
                      </Link>
                    </li>

                    <li>
                      <Link
                        className="rooms-dropdown-item light-text"
                        to="/rooms/room-2"
                        onClick={() => setRoomsOpen(false)}
                      >
                        Dummy Link 2
                      </Link>
                    </li>

                    <li>
                      <Link
                        className="rooms-dropdown-item light-text"
                        to="/rooms/room-3"
                        onClick={() => setRoomsOpen(false)}
                      >
                        Dummy Link 3
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>

            {/* SIGN UP */}
            <button
              className="btn btn-nav-right light-text light-border hover-accent-background hover-dark-text"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#signupModal"
            >
              Sign Up
            </button>

            {/* LOG IN */}
            <button
              className="btn btn-nav-right accent-background dark-text accent-border hover-light-background"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#loginModal"
            >
              Log in
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;