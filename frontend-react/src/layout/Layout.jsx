import { Outlet } from "react-router-dom";

import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import BookingModal from "../components/BookingModal.jsx";
import SignupModal from "../components/SignupModal";

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
    </>
  );
}

export default Layout;