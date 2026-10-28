
import { useState } from "react";
import { createReservation } from "../API/reservationApi";
function bookingModal({ selectedRoomType, isOpen, onClose }){

    if (!isOpen) return null;

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
                    Check availability for a {selectedRoomType.name} room
                  </h5>

                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={onClose}
                  />
                </div>

                {/* MODAL BODY */}

                <div className="modal-body">
                  <p className="dark-text">
                    Select your check-in and check-out dates.
                  </p>

                  {/* CHECK IN */}

                  <div className="mb-3">
                    <label
                      htmlFor="checkIn"
                      className="form-label dark-text fw-bold"
                    >
                      Check-in
                    </label>

                    <input
                      id="checkIn"
                      type="date"
                      className="form-control"
                      value={checkIn}
                      min={
                        new Date()
                          .toISOString()
                          .split("T")[0]
                      }
                      onChange={(e) => {
                        setCheckIn(e.target.value);
                        setAvailability(null);
                        setAvailabilityError(null);
                      }}
                    />
                  </div>

                  {/* CHECK OUT */}

                  <div className="mb-3">
                    <label
                      htmlFor="checkOut"
                      className="form-label dark-text fw-bold"
                    >
                      Check-out
                    </label>

                    <input
                      id="checkOut"
                      type="date"
                      className="form-control"
                      value={checkOut}
                      min={
                        checkIn ||
                        new Date()
                          .toISOString()
                          .split("T")[0]
                      }
                      onChange={(e) => {
                        setCheckOut(e.target.value);
                        setAvailability(null);
                        setAvailabilityError(null);
                      }}
                    />
                  </div>

                  {/* ERROR */}

                  {availabilityError && (
                    <div className="alert alert-danger">
                      {availabilityError}
                    </div>
                  )}

                  {/* AVAILABILITY */}

                  {availability && availability.availableRooms <= 0 && (
                    <div className="alert alert-danger">
                      <strong>
                        No rooms available for this period.
                      </strong>
                    </div>
                  )}
                </div>

                {/* MODAL FOOTER */}

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeBookingModal}
                  >
                    Close
                  </button>

                  <button
                    type="button"
                    className="btn accent-background dark-text fw-bold"
                    onClick={handleCheckAvailability}
                    disabled={checkingAvailability}
                  >
                    {checkingAvailability
                      ? "Checking..."
                      : "Check availability"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* MODAL BACKDROP */}

          <div
            className="modal-backdrop fade show"
            onClick={closeBookingModal}
          />
        </>
      )
}


function bookingDetailsModal(){
  {/* ======================================
          BOOKING DETAILS MODAL
      ====================================== */}

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
                    onClick={closeBookingDetailsModal}
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
                        htmlFor="guestName"
                        className="form-label dark-text fw-bold"
                      >
                        Full name
                      </label>

                      <input
                        id="guestName"
                        type="text"
                        className="form-control"
                        value={guestName}
                        onChange={(e) =>
                          setGuestName(e.target.value)
                        }
                        placeholder="Enter your full name"
                        required
                      />
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
                    onClick={closeBookingDetailsModal}
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
            onClick={closeBookingDetailsModal}
          />
        </>
      )
}

export default bookingModal;


