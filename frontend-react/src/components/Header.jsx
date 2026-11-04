import { Link, NavLink } from "react-router-dom";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { logout } from "../API/registerApi";
import BookingModal from "./BookingModal";



function Header() {
  const [roomsOpen, setRoomsOpen] = useState(false);

  const [logged,setLogged] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function showBookingModal(){
    setShowModal(true);
  }

  function closeBookingModal(){
    setShowModal(false);
  }

  // TODO: update on logout
  useEffect(()=>{
    fetch("http://localhost:8080/auth/status",{
        credentials: "include",
    }).then(r => {
      if(r.ok){
        console.log('logged')
        setLogged(true);
      }
      else{
        console.log('not logged');
        setLogged(false);
      }
    });
  },[]);

  return (
    <header className="dark-background">
      <nav className="navbar navbar-expand-lg dark-background">
        <div className="container-fluid">
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
                    <li>
                      <Link
                        className="rooms-dropdown-item light-text hover-accent-text"
                        to="/rooms"
                      >
                        Rooms and prices
                      </Link>
                    </li>

                    <li>
                      <Link
                        className="rooms-dropdown-item light-text hover-accent-text"
                        to="/"
                
                        onClick={()=>showBookingModal()}
                      >
                        Booking
                      </Link>
                    </li>

                    <li>
                      <div id="icons">
                        <a href="https://facebook.com/"
                          aria-label="Facebook"
                          target="_blank"
                          rel="noreferrer"
                          className="accent-text"
                          >
                          <i className="bi bi-facebook fs-3"></i>
                        </a>

                        <a href="https://instagram.com"
                          aria-label="Instagram"
                          target="_blank"
                          rel="noreferrer"
                          className="accent-text"
                          >
                          <i className="bi bi-instagram fs-3"></i>
                        </a>

                        <a href="https://tiktok.com/"
                          aria-label="TikTok"
                          target="_blank"
                          rel="noreferrer"
                          className="accent-text">
                          <i className="bi bi-tiktok fs-3"></i>
                        </a>
                       </div>
                    </li>
                  </ul>
                )}
              </li>
            
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
              data-bs-toggle="modal"
              data-bs-target="#loginModal"
              style={{ display: logged ? "none" : "block" }}
            >
              Log in
            </button>

            <button
              id="logout-btn"
              className="btn btn-nav-right accent-background dark-text accent-border hover-light-background"
              type="button"
              onClick={()=>logout()}
              style={{ display: logged ? "block" : "none" }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <BookingModal 
        isOpen={showModal}
        onClose={closeBookingModal}
      />
    </header>
  );
}

export default Header;