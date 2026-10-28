
import { Outlet } from "react-router-dom";

import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import BookingModal from "../components/BookingModal.jsx";
import SignupModal from "../components/SignupModal.jsx";
import LoginModal from "../components/LoginModal.jsx";

function Layout() {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />

      <BookingModal />
      <SignupModal />
      <LoginModal />
    </>
  );
}

export default Layout;

