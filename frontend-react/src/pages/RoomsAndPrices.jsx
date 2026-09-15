import { useEffect, useState } from "react";
import {
  getRoomTypes,
  checkRoomAvailability
} from "../API/roomTypeApi";

function RoomsAndPrices() {

  const [roomTypes, setRoomTypes] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState(null);

  // Dates
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  // Availability
  const [availability, setAvailability] = useState(null);
  const [checkingAvailability, setCheckingAvailability] =
    useState(false);

  const [availabilityError, setAvailabilityError] =
    useState(null);


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
  // OPEN BOOKING MODAL
  // ==========================================

  const openBookingModal = (roomType) => {

    setSelectedRoomType(roomType);

    setCheckIn("");
    setCheckOut("");

    setAvailability(null);
    setAvailabilityError(null);

    setShowModal(true);
  };


  // ==========================================
  // CLOSE MODAL
  // ==========================================

  const closeBookingModal = () => {

    setShowModal(false);

    setSelectedRoomType(null);

    setCheckIn("");
    setCheckOut("");

    setAvailability(null);
    setAvailabilityError(null);
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

    } catch (error) {

      setAvailabilityError(error.message);

    } finally {

      setCheckingAvailability(false);

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
                    onClick={() =>
                      openBookingModal(roomType)
                    }
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
          BOOKING MODAL
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
                    Book a {selectedRoomType.name} room
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

                  {availability && (

                    <div
                      className={`alert ${
                        availability.availableRooms > 0
                          ? "alert-success"
                          : "alert-danger"
                      }`}
                    >

                      {availability.availableRooms > 0 ? (

                        <>
                          <strong>
                            {availability.availableRooms}
                          </strong>{" "}
                          room
                          {availability.availableRooms !== 1
                            ? "s"
                            : ""}{" "}
                          available.
                        </>

                      ) : (

                        <strong>
                          No rooms available for this period.
                        </strong>

                      )}

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

    </div>
  );
}

export default RoomsAndPrices;