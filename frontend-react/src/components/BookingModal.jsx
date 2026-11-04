
import { useState, useEffect } from "react";
import { createReservation } from "../API/reservationApi";
import { checkRoomAvailability, getRoomTypes } from "../API/roomTypeApi";
import { BookingDetailsModal } from "./BookingDetailsModal";

export default function BookingModal({ selectedRoomType=null , isOpen, onClose }){

    if (!isOpen) return null;

    const [showModal, setShowModal] = useState(true);
    // Dates
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");

    // Availability
    const [availability, setAvailability] = useState(null);
    const [checkingAvailability, setCheckingAvailability] = useState(false);
    const [availabilityError, setAvailabilityError] = useState(null);

    const [showBookingDetailsModal, setShowBookingDetailsModal] = useState(false);

    const [roomTypes, setRoomTypes] = useState([]);

    useEffect(()=>{
      if (selectedRoomType) return;

      async function loadRoomTypes(){
        const response = await getRoomTypes();
        setRoomTypes(response);
        
      }

      loadRoomTypes();
      console.log(roomTypes)

    },[]);

    function setSelectedRoomType(roomType){
      selectedRoomType = roomType;
    }

    const closeBookingDetailsModal = () => {
      setShowBookingDetailsModal(false);
      onClose();
    };

    const handleCheckAvailability = async () => {
      if (!checkIn || !checkOut) {
        setAvailabilityError(
          "Please select both check-in and check-out dates."
        );
        return;
      }

      if (checkOut <= checkIn) {
        setAvailabilityError(
          "Check-out date must be after check-in date."
        );
        return;
      }

      if (!selectedRoomType) {
        setAvailabilityError("No room type selected.");
        return;
      }

      try {
        setCheckingAvailability(true);
        setAvailabilityError(null);
        setAvailability(null);

        const data = await checkRoomAvailability(
          selectedRoomType.id,
          checkIn,
          checkOut
        );

        setAvailability(data);

        // ==========================================
        // OPEN BOOKING MODAL AFTER AVAILABILITY CHECK
        // ==========================================

        if (data.availableRooms > 0) {
          setShowModal(false);
          
          setShowBookingDetailsModal(true);
        }
      } catch (error) {
        setAvailabilityError(error.message);
      } finally {
        setCheckingAvailability(false);
      }
  };



    return(
        <>
          <div
            className={`modal fade ${showModal ? "show d-block" : "force-hidden"}`}
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
                    Check availability for a {selectedRoomType ? selectedRoomType.name : ""} room
                  </h5>

                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={onClose}
                  />
                </div>

                {/* MODAL BODY */}

                <div className="modal-body">

                  { !selectedRoomType && (
                    <div>
                      {/* FIXME: cant update selectedRoomType */}
                      <select value={selectedRoomType ?? ""} onChange={(event) => setSelectedRoomType(event.target.value)}>
                        <option value="">Select a room type</option>
                        {roomTypes.map((option) => (
                          <option key={option.id} value={option.id} on>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}


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
                    onClick={onClose}
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
            onClick={onClose}
          />


          <BookingDetailsModal
            selectedRoomType={selectedRoomType}
            availability={availability}
            checkIn={checkIn}
            checkOut={checkOut}
            isOpen={showBookingDetailsModal}
            onClose={closeBookingDetailsModal}
          />
        </>
      )
}




