import { useState } from "react";
import { createReservation } from "../API/reservationApi";

function BookingModal() {
  const [roomType, setRoomType] = useState("Select room type");

  const [reservation, setReservation] = useState({
    customer_id: "",
    room_id: "",
    total_price: "",
    check_in: "",
    check_out: "",
    status: ""
  });

  function changeField(event) {
    const { name, value } = event.target;

    setReservation((currentReservation) => ({
      ...currentReservation,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const data = await createReservation(reservation);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className="modal fade"
      id="bookingModal"
      tabIndex="-1"
      aria-labelledby="bookingModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title fs-5" id="bookingModalLabel">
              Booking
            </h2>

            <button
              className="btn-close"
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body" id="bookingInfo">
              <div className="dropdown mb-3">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {roomType}
                </button>

                <ul className="dropdown-menu">
                  <li>
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={() => setRoomType("Single")}
                    >
                      Single
                    </button>
                  </li>

                  <li>
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={() => setRoomType("Double")}
                    >
                      Double
                    </button>
                  </li>

                  <li>
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={() => setRoomType("Deluxe")}
                    >
                      Deluxe
                    </button>
                  </li>
                </ul>
              </div>

              <label htmlFor="customerId">Customer ID</label>

              <input
                id="customerId"
                className="form-control mb-2"
                name="customer_id"
                value={reservation.customer_id}
                onChange={changeField}
              />

              <label htmlFor="roomId">Room ID</label>

              <input
                id="roomId"
                className="form-control mb-2"
                name="room_id"
                value={reservation.room_id}
                onChange={changeField}
              />

              <label htmlFor="totalPrice">Total price</label>

              <input
                id="totalPrice"
                className="form-control mb-2"
                name="total_price"
                value={reservation.total_price}
                onChange={changeField}
              />

              <label htmlFor="checkIn">Check in</label>

              <input
                id="checkIn"
                className="form-control mb-2"
                name="check_in"
                type="date"
                value={reservation.check_in}
                onChange={changeField}
              />

              <label htmlFor="checkOut">Check out</label>

              <input
                id="checkOut"
                className="form-control mb-2"
                name="check_out"
                type="date"
                value={reservation.check_out}
                onChange={changeField}
              />

              <label htmlFor="status">Status</label>

              <input
                id="status"
                className="form-control"
                name="status"
                value={reservation.status}
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

              <button id="book" className="btn btn-primary" type="submit">
                Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookingModal;