
import { useState } from "react";
import { createCustomer } from "../API/registerApi";
import { Modal } from "bootstrap";

function SignupModal() {
  const [customer, setCustomer] = useState({
    userName: "",
    email: "",
    password: ""
  });

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
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h2 className="modal-title fs-5" id="signupModalLabel">
              Sign Up
            </h2>

            <button
              className="btn-close"
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
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

              <label htmlFor="usernameInput">
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

              <label htmlFor="emailInput">
                Email
              </label>

              <input
                id="emailInput"
                className="form-control mb-2"
                name="email"
                type="email"
                value={customer.email}
                onChange={changeField}
                required
              />

              <label htmlFor="passwordInput">
                Password
              </label>

              <input
                id="passwordInput"
                className="form-control"
                name="password"
                type="password"
                value={customer.password}
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
                className="btn btn-primary"
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

