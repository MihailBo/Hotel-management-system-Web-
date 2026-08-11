import { Route, Routes } from "react-router-dom";

import Layout from "./layout/Layout";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import RoomsAndPrices from "./pages/RoomsAndPrices";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/rooms" element={<RoomsAndPrices />} />
      </Route>
    </Routes>
  );
}

export default App;