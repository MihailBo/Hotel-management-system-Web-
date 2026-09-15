import { useState } from "react";
import { loginCustomer } from "../API/customerApi";

function LoginModal() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  function changeField(event) {
    const { name, value } = event.target;

    setCredentials((currentCredentials) => ({
      ...currentCredentials,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const data = await loginCustomer(credentials);
      console.log(data);
    } catch (error) {
      console.error(error);
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
              aria-label="Close"
            />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body" id="loginInfo">

              <label htmlFor="loginEmailInput">
                Email
              </label>

              <input
                id="loginEmailInput"
                className="form-control mb-2"
                name="email"
                type="email"
                value={credentials.email}
                onChange={changeField}
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