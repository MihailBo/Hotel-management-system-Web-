
import { Outlet, BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import BookingModal from "../components/BookingModal.jsx";
import SignupModal from "../components/SignupModal.jsx";
import LoginModal from "../components/LoginModal.jsx";
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
      <SignupModal />
      <LoginModal />
    </ModalProvider>
    </>
  );
}

export default Layout;

