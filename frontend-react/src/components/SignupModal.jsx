import { useState } from "react";
import { createCustomer } from "../API/customerApi";

function SignupModal() {
  const [customer, setCustomer] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phoneNum: "",
    idCard_id: "",
    password: ""
  });

  function changeField(event) {
    const { name, value } = event.target;

    setCustomer((currentCustomer) => ({
      ...currentCustomer,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const data = await createCustomer(customer);
      console.log(data);
    } catch (error) {
      console.error(error);
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
            <div className="modal-body" id="singUpInfo">
              <label htmlFor="nameInput">First name</label>

              <input
                id="nameInput"
                className="form-control mb-2"
                name="first_name"
                value={customer.first_name}
                onChange={changeField}
              />

              <label htmlFor="lastNameInput">Last name</label>

              <input
                id="lastNameInput"
                className="form-control mb-2"
                name="last_name"
                value={customer.last_name}
                onChange={changeField}
              />

              <label htmlFor="emailInput">Email</label>

              <input
                id="emailInput"
                className="form-control mb-2"
                name="email"
                type="email"
                value={customer.email}
                onChange={changeField}
              />

              <label htmlFor="phoneInput">Phone number</label>

              <input
                id="phoneInput"
                className="form-control mb-2"
                name="phoneNum"
                value={customer.phoneNum}
                onChange={changeField}
              />

              <label htmlFor="cardIdInput">ID card</label>

              <input
                id="cardIdInput"
                className="form-control mb-2"
                name="idCard_id"
                value={customer.idCard_id}
                onChange={changeField}
              />

              <label htmlFor="passwordInput">Password</label>

              <input
                id="passwordInput"
                className="form-control"
                name="password"
                type="password"
                value={customer.password}
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

              <button id="send" className="btn btn-primary" type="submit">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupModal;