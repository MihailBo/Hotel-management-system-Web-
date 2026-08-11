import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Hotel
          </Link>

          <button
            className="navbar-toggler"
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
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About Us
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/rooms">
                  Rooms And Prices
                </NavLink>
              </li>
            </ul>

            <button
              className="btn btn-outline-light btn-nav-right"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#signupModal"
            >
              Sign Up
            </button>

            <button
              className="btn btn-warning btn-nav-right"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#bookingModal"
            >
              Booking
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;