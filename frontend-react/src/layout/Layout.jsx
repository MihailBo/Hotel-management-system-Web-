
import { Outlet, BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import BookingModal from "../components/Modals/BookingModal.jsx";
import { BookingDetailsModal } from "../components/Modals/BookingDetailsModal.jsx";
import SignupModal from "../components/Modals/SignupModal.jsx";
import LoginModal from "../components/Modals/LoginModal.jsx";
import { ModalProvider } from "../context/ModalContext";
function Layout() {
  return (
    <>
    <ModalProvider>
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />

      <BookingModal />
      <BookingDetailsModal />
      <SignupModal />
      <LoginModal />
    </ModalProvider>
    </>
  );
}

export default Layout;

