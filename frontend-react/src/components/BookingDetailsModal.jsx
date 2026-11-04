
import { useState } from "react";
import { createReservation } from "../API/reservationApi";
import { checkRoomAvailability } from "../API/roomTypeApi";

export function BookingDetailsModal({selectedRoomType, availability, checkIn, checkOut,  isOpen, onClose}){


      if (!isOpen) return null;
      // Availability

      const [availabilityError, setAvailabilityError] = useState(null);

      const [guestFirstName, setGuestFirstName] = useState("");
      const [guestLastName, setGuestLastName] = useState("");
      const [guestEmail, setGuestEmail] = useState("");
      const [guestPhone, setGuestPhone] = useState("");



      const handleConfirmBooking = async (e) => {
        e.preventDefault();

        if (!guestFirstName || !guestLastName || !guestEmail || !guestPhone) {
          setAvailabilityError("Please fill in all guest details.");
          return;
        }

        if (!selectedRoomType || !checkIn || !checkOut) {
          setAvailabilityError("Booking information is incomplete.");
          return;
        }

        try {


          const reservation = {
  

            // IMPORTANT:
            // This must be the actual ROOM id, not necessarily the room type id.
            roomId: selectedRoomType.id,

            firstName: guestFirstName,
            lastName: guestLastName,
            // LocalDateTime format expected by Spring:
            // YYYY-MM-DDTHH:mm:ss
            check_in: `${checkIn}T00:00:00`,
            check_out: `${checkOut}T00:00:00`,

            phoneNum: guestPhone,
            email: guestEmail,

  
          };

          console.log("Sending reservation:", reservation);

          const data = await createReservation(reservation);

          console.log("Reservation created:", data);

          alert("Reservation created successfully!");

          onClose();

        } catch (error) {
          console.error("Reservation error:", error);

          setAvailabilityError(
            error.message || "Could not create reservation."
          );
        }
      };

      return(
        <>
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
          >
            <div
              className="modal-dialog modal-dialog-centered"
              role="document"
            >
              <div className="modal-content">

                {/* MODAL HEADER */}

                <div className="modal-header dark-background">
                  <h5 className="modal-title white-text">
                    Complete your booking
                  </h5>

                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={onClose}
                  />
                </div>

                {/* MODAL BODY */}
                

                <div className="modal-body">

                  {/* ERROR */}

                  {availabilityError && (
                    <div className="alert alert-danger">
                      {availabilityError}
                    </div>
                  )}    

                  <div className="mb-4">
                    <h6 className="dark-text fw-bold">
                      {selectedRoomType.name}
                    </h6>

                    <p className="dark-text mb-1">
                      <strong>Check-in:</strong>{" "}
                      {checkIn}
                    </p>

                    <p className="dark-text mb-1">
                      <strong>Check-out:</strong>{" "}
                      {checkOut}
                    </p>

                    <p className="dark-text mb-0">
                      <strong>Rooms available:</strong>{" "}
                      {availability?.availableRooms}
                    </p>
                  </div>

                  <form id="bookingForm">
                    {/* GUEST NAME */}

                    <div className="mb-3">
                      <label
                        htmlFor="guestFistName"
                        className="form-label dark-text fw-bold"
                      >
                        First name
                      </label>

                      <input
                        id="guestFirstName"
                        type="text"
                        className="form-control"
                        value={guestFirstName}
                        onChange={(e) =>
                          setGuestFirstName(e.target.value)
                        }
                        placeholder="Enter your first name"
                        required
                      />

                      <div className="mb-3">
                      <label
                        htmlFor="guestLastName"
                        className="form-label dark-text fw-bold"
                      >
                        Last name
                      </label>

                      <input
                        id="guestLastName"
                        type="text"
                        className="form-control"
                        value={guestLastName}
                        onChange={(e) =>
                          setGuestLastName(e.target.value)
                        }
                        placeholder="Enter your last name"
                        required
                      />
                      </div>
                    </div>

                    {/* GUEST EMAIL */}

                    <div className="mb-3">
                      <label
                        htmlFor="guestEmail"
                        className="form-label dark-text fw-bold"
                      >
                        Email
                      </label>

                      <input
                        id="guestEmail"
                        type="email"
                        className="form-control"
                        value={guestEmail}
                        onChange={(e) =>
                          setGuestEmail(e.target.value)
                        }
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    {/* GUEST PHONE */}

                    <div className="mb-3">
                      <label
                        htmlFor="guestPhone"
                        className="form-label dark-text fw-bold"
                      >
                        Phone
                      </label>

                      <input
                        id="guestPhone"
                        type="tel"
                        className="form-control"
                        value={guestPhone}
                        onChange={(e) =>
                          setGuestPhone(e.target.value)
                        }
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </form>

                  
                </div>

                {/* MODAL FOOTER */}

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onClose}
                  >
                    Cancel
                  </button>

                  <button
                    
             
                    className="btn accent-background dark-text fw-bold"
                    onClick={handleConfirmBooking}
                  >
                    Confirm booking
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* MODAL BACKDROP */}

          <div
            className="modal-backdrop fade show"
            onClick={onClose}
          />
        </>
      )
}

