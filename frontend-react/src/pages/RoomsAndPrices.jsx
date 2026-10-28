import { useEffect, useState } from "react";
import { createReservation } from "../API/reservationApi";
import {
  getRoomTypes,
  checkRoomAvailability
} from "../API/roomTypeApi";

function RoomsAndPrices() {
  const [roomTypes, setRoomTypes] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Availability modal
  const [showModal, setShowModal] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState(null);

  // Booking details modal
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Dates
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  // Availability
  const [availability, setAvailability] = useState(null);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [availabilityError, setAvailabilityError] = useState(null);

  // Guest details
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");

  // ==========================================
  // LOAD ROOM TYPES
  // ==========================================

  useEffect(() => {
    async function loadRoomTypes() {
      try {
        const data = await getRoomTypes();
        setRoomTypes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadRoomTypes();
  }, []);

  // ==========================================
  // ROOM IMAGES
  // ==========================================

  const getRoomImage = (roomType) => {
    switch (roomType) {
      case "SINGLE":
        return "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80";

      case "DOUBLE":
        return "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80";

      case "DELUXE":
        return "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80";

      default:
        return "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80";
    }
  };

  // ==========================================
  // OPEN AVAILABILITY MODAL
  // ==========================================

  const openBookingModal = (roomType) => {
    setSelectedRoomType(roomType);

    setCheckIn("");
    setCheckOut("");

    setAvailability(null);
    setAvailabilityError(null);

    setShowModal(true);
    setShowBookingModal(false);
  };

  // ==========================================
  // CLOSE AVAILABILITY MODAL
  // ==========================================

  const closeBookingModal = () => {
    setShowModal(false);

    setAvailability(null);
    setAvailabilityError(null);
  };

  // ==========================================
  // OPEN BOOKING DETAILS MODAL
  // ==========================================

  const openBookingDetailsModal = () => {
    setShowModal(false);
    setShowBookingModal(true);
  };

  // ==========================================
  // CLOSE BOOKING DETAILS MODAL
  // ==========================================

  const closeBookingDetailsModal = () => {
    setShowBookingModal(false);

    setSelectedRoomType(null);

    setCheckIn("");
    setCheckOut("");

    setAvailability(null);
    setAvailabilityError(null);

    setGuestName("");
    setGuestEmail("");
    setGuestPhone("");
  };

  // ==========================================
  // CHECK AVAILABILITY
  // ==========================================

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
        setShowBookingModal(true);
      }
    } catch (error) {
      setAvailabilityError(error.message);
    } finally {
      setCheckingAvailability(false);
    }
  };

  // ==========================================
  // CONFIRM BOOKING
  // ==========================================

  // const handleConfirmBooking = (e) => {
  //   e.preventDefault();

  //   if (!guestName || !guestEmail || !guestPhone) {
  //     return;
  //   }

  //   // Add your booking API call here.
  //   console.log("Booking details:", {
  //     roomTypeId: selectedRoomType?.id,
  //     roomType: selectedRoomType?.name,
  //     checkIn,
  //     checkOut,
  //     availableRooms: availability?.availableRooms,
  //     guestName,
  //     guestEmail,
  //     guestPhone
  //   });

  //   alert("Booking details submitted successfully.");

  //   closeBookingDetailsModal();
  // };

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    console.log("rabotq")

    if (!guestName || !guestEmail || !guestPhone) {
      setAvailabilityError("Please fill in all guest details.");
      return;
    }

    if (!selectedRoomType || !checkIn || !checkOut) {
      setAvailabilityError("Booking information is incomplete.");
      return;
    }

    try {
      // TODO:
      // Replace this with the actual logged-in customer's ID.
      const customerId = Number(localStorage.getItem("customerId"));

      if (!customerId) {
        setAvailabilityError("Customer ID was not found.");
        return;
      }

      const reservation = {
        customer_id: customerId,

        // IMPORTANT:
        // This must be the actual ROOM id, not necessarily the room type id.
        room_id: selectedRoomType.id,

        // Replace with your actual room price property.
        total_price: selectedRoomType.price,

        // LocalDateTime format expected by Spring:
        // YYYY-MM-DDTHH:mm:ss
        check_in: `${checkIn}T00:00:00`,
        check_out: `${checkOut}T00:00:00`,

        // Change this value if your BookedStatus enum uses another name.
        status: "PENDING"
      };

      console.log("Sending reservation:", reservation);

      const data = await createReservation(reservation);

      console.log("Reservation created:", data);

      alert("Reservation created successfully!");

      closeBookingDetailsModal();

    } catch (error) {
      console.error("Reservation error:", error);

      setAvailabilityError(
        error.message || "Could not create reservation."
      );
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div
          className="spinner-border accent-text"
          role="status"
        >
          <span className="visually-hidden">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert darker-background light-text">
          Error: {error}
        </div>
      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="light-background min-vh-100 py-5">
      <div className="container">
        <h1 className="text-center dark-text fw-bold mb-5">
          Rooms & Prices
        </h1>

        {/* ======================================
            ROOM CARDS
        ====================================== */}

        <div className="row g-4">
          {roomTypes.map((roomType) => (
            <div
              className="col-12 col-md-6 col-lg-4"
              key={roomType.id}
            >
              <div className="card h-100 shadow-sm dark-border">
                <img
                  src={getRoomImage(roomType.name)}
                  className="card-img-top"
                  alt={`${roomType.name} room`}
                  style={{
                    height: "250px",
                    objectFit: "cover"
                  }}
                />

                <div className="card-body d-flex flex-column white-background">
                  <h2 className="card-title dark-text fw-bold">
                    {roomType.name}
                  </h2>

                  <p className="card-text dark-text">
                    {roomType.description}
                  </p>

                  <button
                    className="btn accent-background dark-text fw-bold mt-auto"
                    onClick={() => openBookingModal(roomType)}
                  >
                    Booking
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ======================================
          AVAILABILITY MODAL
      ====================================== */}

      {showModal && selectedRoomType && (
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
                    onClick={closeBookingModal}
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
      )}

      {/* ======================================
          BOOKING DETAILS MODAL
      ====================================== */}

      {showBookingModal && selectedRoomType && (
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
      )}
    </div>
  );
}

export default RoomsAndPrices;
