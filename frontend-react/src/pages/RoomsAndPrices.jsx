import { useEffect, useState } from "react";
import { createReservation } from "../API/reservationApi";
import {
  getRoomTypes,
  checkRoomAvailability
} from "../API/roomTypeApi";
import BookingModal from "../components/BookingModal"
import { useModal } from "../context/ModalContext";

function RoomsAndPrices() {
  const [roomTypes, setRoomTypes] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    openBookingOrLogin,
    openLoginModal,
    logged,
    setLogged,
  } = useModal();
 
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

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert darker-background light-text">
          Error: {error}
        </div>
      </div>
    );
  }

 return (
    <div className="light-background min-vh-100 py-5">
      <div className="container">
        <h1 className="text-center dark-text fw-bold mb-5">
          Rooms & Prices
        </h1>

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
                   // onClick={() => openBookingModal(roomType)}
                   onClick={() => openBookingOrLogin(roomType)}
                  >
                    Booking
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default RoomsAndPrices;
