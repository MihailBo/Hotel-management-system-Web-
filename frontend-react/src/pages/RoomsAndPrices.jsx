import { useEffect, useState } from "react";
import { createReservation } from "../API/reservationApi";
import {
  getRoomTypes,
  checkRoomAvailability
} from "../API/roomTypeApi";

import BookingModal from "../components/BookingModal"

function RoomsAndPrices() {
  const [roomTypes, setRoomTypes] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Availability modal
  const [showModal, setShowModal] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState(null);

  // Booking details modal



  // Guest details
  // const [guestName, setGuestName] = useState("");
  // const [guestEmail, setGuestEmail] = useState("");
  // const [guestPhone, setGuestPhone] = useState("");

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

    setShowModal(true);
    console.log("opening modal")
    // setShowBookingModal(false);
  };

  // ==========================================
  // CLOSE AVAILABILITY MODAL
  // ==========================================

  const closeBookingModal = () => {
    setShowModal(false);
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



  // ==========================================
  // CHECK AVAILABILITY
  // ==========================================

  
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

      <BookingModal 
        selectedRoomType={selectedRoomType}
        isOpen={showModal}
        onClose={closeBookingModal}
      />

      {/* ======================================
          BOOKING DETAILS MODAL
      ====================================== */}

    </div>
  );
}

export default RoomsAndPrices;
