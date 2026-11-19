import { useEffect, useState } from "react";
import { Modal } from "bootstrap";

import { loginCustomer } from "../API/registerApi";

export default function LoginModal({isOpen, onClose}) {


  const [credentials, setCredentials] = useState({
    userName: "",
    password: ""
  });

   useEffect(() => {
    const element = document.getElementById("loginModal");
    //if (!element) return;

    const modal = Modal.getOrCreateInstance(element);

    if (isOpen == true) {
      modal.show();
    } else {
      modal.hide();
    }
  }, [isOpen]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function changeField(event) {
    const { name, value } = event.target;

    setCredentials((currentCredentials) => ({
      ...currentCredentials,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    try {
      await loginCustomer(credentials);

      setSuccess("Login successful!");

      setCredentials({
        userName: "",
        password: ""
      });

      setTimeout(() => {
        const modalElement = document.getElementById("loginModal");

        if (modalElement) {
          const modal = Modal.getOrCreateInstance(modalElement);
          modal.hide();
        }

        setSuccess("");
      }, 1000);

    } catch (error) {
      console.error(error);
      setError(error.message || "Login failed.");
    }
  }

  return (
<div
  className="modal fade"
  id="loginModal"
  tabIndex="-1"
  aria-labelledby="loginModalLabel"
  aria-hidden="true"
>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header dark-background">
        <h2 className="modal-title fs-5 white-text" id="loginModalLabel">
          Log In
        </h2>

        <button
          className="btn-close btn-close-white"
          type="button"
          data-bs-dismiss="modal"
          aria-label="Close"
          data-bs-dismiss="modal"
        />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          {error && <div className="alert alert-danger">{error}</div>}

          {success && <div className="alert alert-success">{success}</div>}

          <label className="form-label dark-text" htmlFor="loginUsernameInput">
            Username
          </label>
          <input
            placeholder="Enter your username"
            id="loginUsernameInput"
            className="form-control mb-2"
            name="userName"
            type="text"
            value={credentials.userName}
            onChange={changeField}
            required
          />

          <label className="form-label dark-text" htmlFor="loginPasswordInput">
            Password
          </label>
          <input
            placeholder="Enter your password"
            id="loginPasswordInput"
            className="form-control"
            name="password"
            type="password"
            value={credentials.password}
            onChange={changeField}
            required
            onMouseEnter={(e) =>{
              e.currentTarget.type= "text";
            }}
            onMouseLeave={(e) =>{
              e.currentTarget.type= "password";
            }}
          />
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
            id="login"
            className="btn accent-background dark-text fw-bold"
            type="submit"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

  );
}

