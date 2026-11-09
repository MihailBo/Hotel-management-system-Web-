
import { useState } from "react";
import { createCustomer } from "../API/registerApi";
import { Modal } from "bootstrap";
import LoginModal from "./LoginModal";

function SignupModal({isOpen, onClose}) {



   const [showModal, setShowModal] = useState(false);
   const [customer, setCustomer] = useState({
    userName: "",
    email: "",
    password: ""
  });

  function showLoginModal(){
    setShowModal(true);
  }

  function closeSingupModal(){
    setShowModal(false);
  
  }
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  //   const modalElement = document.getElementById("signupModal");

  // if (modalElement) {
  //   const modal = Modal.getOrCreateInstance(modalElement);
  //   modal.hide();
  // }
  function changeField(event) {
    const { name, value } = event.target;

    setCustomer((currentCustomer) => ({
      ...currentCustomer,
      [name]: value
    }));
  }
  // function openLoginModal(){
  //   showLoginModal();
  //   closeSingupModal();
  // }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    try {
      await createCustomer(customer);

      setSuccess("Registration successful!");

      setCustomer({
        userName: "",
        email: "",
        password: ""
      });

      // Изчакваме малко, за да се види success съобщението
      setTimeout(() => {
        const modalElement = document.getElementById("signupModal");

        if (modalElement) {
          const modal = Modal.getOrCreateInstance(modalElement);
          modal.hide();
        }

        setSuccess("");
      }, 1000);
    } catch (error) {
      console.error(error);
      setError(error.message || "Registration failed.");
    }
  }

  return (
    <div
      className="modal fade"
      id="signupModal"
      tabIndex="-1"
      aria-labelledby="signupModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header dark-background">
            <h2 className="modal-title fs-5 white-text" id="signupModalLabel">
              Sign Up
            </h2>

            <button
              className="btn-close btn-close-white"
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {error && <div className="alert alert-danger">{error}</div>}

              {success && (
                <div className="alert alert-success">{success}</div>
              )}

              <label className="form-label dark-text" htmlFor="usernameInput">
                Username
              </label>
              <input
                id="usernameInput"
                className="form-control mb-2"
                name="userName"
                type="text"
                value={customer.userName}
                onChange={changeField}
                
                required
              />

              <label className="form-label dark-text" htmlFor="emailInput">
                Email
              </label>
              <input
                id="emailInput"
                className="form-control mb-2"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={customer.email}
                onChange={changeField}
                required
              />

              <label className="form-label dark-text" htmlFor="passwordInput">
                Password
              </label>
              <input
                id="passwordInput"
                className="form-control"
                name="password"
                type="password"
                value={customer.password}
                onChange={changeField}
                 placeholder="Enter your password"
                onMouseEnter={(e) => {
                    e.currentTarget.type = "text";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.type = "password";
                  }}
                required
              />

               <p className="form-label dark-text">
                Already have an account?
               <span
                className="form-label dark-text accent-text"
                role="button"
                data-bs-dismiss="modal"
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
                
            
                >
                  Log In
               </span>
               </p>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                type="button"
                data-bs-dismiss="modal"
              >
                Close
              </button>

              <button
                className="btn accent-background dark-text fw-bold"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}

export default SignupModal;

