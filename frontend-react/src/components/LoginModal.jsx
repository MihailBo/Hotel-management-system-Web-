import { useState } from "react";
import { Modal } from "bootstrap";

import { loginCustomer } from "../API/registerApi";

function LoginModal() {
  const [credentials, setCredentials] = useState({
    userName: "",
    password: ""
  });

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
    >
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h2 className="modal-title fs-5" id="loginModalLabel">
              Log In
            </h2>

            <button
              className="btn-close"
              type="button"
              data-bs-dismiss="modal"
            />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              {success && (
                <div className="alert alert-success">
                  {success}
                </div>
              )}

              <label htmlFor="loginUsernameInput">
                Username
              </label>

              <input
                id="loginUsernameInput"
                className="form-control mb-2"
                name="userName"
                type="text"
                value={credentials.userName}
                onChange={changeField}
                required
              />

              <label htmlFor="loginPasswordInput">
                Password
              </label>

              <input
                id="loginPasswordInput"
                className="form-control"
                name="password"
                type="password"
                value={credentials.password}
                onChange={changeField}
                required
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
                className="btn btn-primary"
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

export default LoginModal;