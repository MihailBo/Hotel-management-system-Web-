import { createContext, useContext, useEffect, useState } from "react";
import BookingModal from "../components/BookingModal";
import LoginModal from "../components/LoginModal";
import checkIfLogged from "../API/CheckIfLogged";

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [logged, setLogged] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState(null);

  useEffect(() => {
  const checkLoginStatus = async () => {
    try {
      const isLogged = await checkIfLogged();
      setLogged(isLogged);

      if (isLogged) {
        console.log("logged");
      } else {
        console.log("not logged");
      }
    } catch (error) {
      console.error("Could not check login status:", error);
      setLogged(false);
    }
  };

  checkLoginStatus();
}, []);

  

  const openLoginModal = () => {
    setShowLoginModal(true);
  }

  

  const openBookingOrLogin = (roomType) => {
  setSelectedRoomType(roomType);
    console.log(selectedRoomType);
  if (logged) {
    setShowBookingModal(true);
  } else {
    setShowLoginModal(true);
  }
};

  return (
    <ModalContext.Provider value={{ 
  openBookingOrLogin, 
  openLoginModal, 
  logged, 
  setLogged 
}}>
      {children}

      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        selectedRoomType={selectedRoomType}
      />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={() => {
          setLogged(true);
          setShowLoginModal(false);
          setShowBookingModal(true);
        }}
      />
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
}
